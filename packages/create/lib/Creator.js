const {promisify} = require('util');
const glob = promisify(require('glob'));
const fs = require('fs-extra');
const path = require('path');
const userhome = require('userhome');
const {prompt} = require('inquirer');
const {red} = require('chalk');
const clone = promisify(require('clone-git-repo'));
const {isBinaryFile} = require('isbinaryfile');
const {config,log,request,withLoading,loadModule,writeFileTree} = require('@vite8/utils');
const {TEMPLATES} = require('@vite8/settings');
const PromptModuleAPI = require('./PromptModuleAPI');
const execa = require('execa');
const GeneratorAPI = require('./GeneratorAPI');
const { runTransformation } = require('vue-codemod');
const defaultFeaturePrompt = {
    name:"features",
    type:'checkbox',
    message:'请选择项目的特性',
    choices:[]
}
class Creator {
    constructor(projectName, projectDir,promptModules) {
        this.projectName = projectName;
        this.projectDir = projectDir;
        this.promptModules = promptModules;
        this.featurePrompt = defaultFeaturePrompt;
        this.injectPrompts = [];//由promptModules插入的新的选项框
        this.promptCompleteCbs = [];//选择结束的回调数组

        this.plugins= [];//这里本项目 启用的插件
        this.fileMiddlewares = [];//文件处理的中间件数组
        this.imports = {};//此处存放文件里额外添加的import语句
        this.files = {};//key是文件路径 值 文件内容 插件在执行过程中写入的都是这个对象files.最后再统一写入硬盘
        
        const promptModuleAPI = new PromptModuleAPI(this);
        promptModules.forEach(module=>module(promptModuleAPI));
    }
    async create() {
        let projectOptions = (this.projectOptions = await this.promptAndResolve());
        //准备好了项目目录
        await this.prepareProjectDir();
        //下载模板
        await this.downloadTemplate();
        //把模板内容拷贝到当前的项目中
        await fs.copy(this.templateDir,this.projectDir);
        //修改当前项目中package.json的开发依赖，添加插件的依赖
        const pkgPath = path.join(this.projectDir,'package.json');
        let pkg = (this.pkg = await fs.readJSON(pkgPath));
        const pluginDeps = Reflect.ownKeys(projectOptions.plugins);//['cli-plugin-router']
        pluginDeps.forEach(dep=>pkg.devDependencies[dep]='latest');
        await fs.writeJSON(pkgPath,pkg,{spaces:2});
        //初始化git仓库
        await execa('git',['init'],{cwd:this.projectDir,stdio:'inherit'});
        //安装依赖包
        await execa('npm',['install'],{cwd:this.projectDir,stdio:'inherit'});
         //初始化files对象
         await this.initFiles();
        //找到插件并执行插件
        let innerPlugins = projectOptions.plugins;//内置插件对象
        let customPlugins = Object.keys(pkg.devDependencies).filter(npmName=>npmName.startsWith('cli-'));
            let pluginObj = {};
            customPlugins.forEach(pluginName=>{
                pluginObj[pluginName]={};
            })
        //Array.from(new Set(allPlugins))
        const resolvedPlugins = await this.resolvePlugins({...innerPlugins,...pluginObj});
        //执行应用插件
        await this.applyPlugins(resolvedPlugins);//执行插件的时候只是添加了中间件的函数
        //插件执行的时候 并不会真正的修改this.files,而是会修改this.imports  this.fileMiddlewares
        //开始调用中间件真正处理文件 this.files
        await this.renderFiles();
        //此插件只在项目生成阶段有用，后面开发运行是没有用的，所以删除掉
        //pluginDeps.forEach(dep=>delete pkg.devDependencies[dep]);
        this.files['package.json']=JSON.stringify(pkg,null,2);
        //把files写入项目目录
        await writeFileTree(this.projectDir,this.files);
        //因为插件可能会扩展依赖包 react-router-dom 
        await execa('npm',['install'],{cwd:this.projectDir,stdio:'inherit'});
    }
    async renderFiles(){
        const {files,projectOptions}= this;
        for(const middleware of this.fileMiddlewares){
            await middleware(files,projectOptions);
        }
        Reflect.ownKeys(files).forEach(file=>{
            let imports = this.imports[file];
            if(imports && imports.length>0){
                files[file]= runTransformation(
                    {path:file,source:files[file]},
                    require('./codemod/injectImports'),
                    {imports}
                )
            }
        });
    }
    //把当前项目 中的文件全部写入this.files里，等待被 改写或者处理
    async initFiles(){
        const projectFiles = await glob('**/*',{cwd:this.projectDir,nodir:true});
        for(let i=0;i<projectFiles.length;i++){
            let projectFile =projectFiles[i];
            let projectFilePath = path.join(this.projectDir,projectFile);
            let content;
            if(await isBinaryFile(projectFilePath)){
                content = await fs.readFile(projectFilePath);
            }else{
                content = await fs.readFile(projectFilePath,'utf8');
            }
            this.files[projectFile]=content;
        }
    }
    async applyPlugins(plugins){
        for(const plugin of plugins){
            const {id,apply,options} = plugin;
            const generatorAPI = new GeneratorAPI(id,this,options);
            await apply(generatorAPI,options);
        }
    }
    async resolvePlugins(rawPlugins){//{'cli-plugin-router':{}}
        let plugins = [];
        for(const id of Reflect.ownKeys(rawPlugins)){
            const apply = loadModule(`${id}/generator`,this.projectDir);
            const options = rawPlugins[id];//插件配置的选项 {historyMode:'hash'}
            plugins.push({id,apply,options});
        }
        return plugins;
    }
    async promptAndResolve(){
        const prompts = [this.featurePrompt,...this.injectPrompts];
        let answers = await prompt(prompts);
        let projectOptions = {plugins:{}};
        this.promptCompleteCbs.forEach(cb=>cb(answers,projectOptions));
        return projectOptions;
    }
    async downloadTemplate(){
        const {GIT_TYPE,ORG_NAME} = config;
        let repos = await withLoading('读取模板',()=>request.get(`/orgs/${ORG_NAME}/repos`));
        let {repo} = await prompt({
            name:'repo',
            type:'list',
            message:'请选择仓库模板',
            choices:repos.map(item=>item.name)
        });
        let tags = await withLoading('读取模板',()=>request.get(`/repos/${ORG_NAME}/${repo}/tags`));
        let {tag} = await prompt({
            name:'tag',
            type:'list',
            message:'请选择标签',
            choices:tags.map(item=>item.name)
        });
        //将要下载的仓库的地址
        let repository = `${GIT_TYPE}:${ORG_NAME}/${repo}#${tag}`;
        const downloadDir = userhome(TEMPLATES);
        const templateDir = (this.templateDir=path.join(downloadDir,repo,tag));
        log.info('vite8','准备下载模板到%s',templateDir);
        try{
            //判断一下此目录是否存在，如果存在了，不需要再克隆了
            await fs.access(templateDir);
        }catch(error){
            log.info('vite8','克隆模板%s到%s',repository,templateDir);
            await clone(repository,templateDir,{clone:true});
        }
    }
    //保证目标目录是存在的
    async prepareProjectDir() {
        let { projectDir } = this;
        let exists = fs.existsSync(projectDir);
        if (exists) {
            const files = await fs.readdir(projectDir);
            if (files.length > 0) {//目录 不为空
                const { overwrite } = await prompt({
                    type: 'confirm',
                    name: 'overwrite',
                    message: '目标目录非空，是否要移除已经存在的目录?'
                });
                if (overwrite) {
                    await fs.emptyDir(projectDir);
                } else {
                    throw new Error(red('X') + "操作被取消");
                }
            }
        } else {
            await fs.mkdirp(projectDir);//如果不存在会抛异常，创建目录
        }
        //准备好了一个空目录，等待拷贝文件了
        log.info('vite8', '%s目录已经准备就绪', projectDir);
    }
}
module.exports = Creator;