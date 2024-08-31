console.log('process.cwd()',process.cwd());
  //1.创建项目目录 currentDirectory=test name=project1
  const {currentDirectory,name} = argv;
  //切换当前的工作目录为currentDirectory test
  //cwd = C:\aproject\vite2\packages\create
  const {ORG_NAME} = config;
  if(!ORG_NAME){
     throw new Error(red('X')+"还没有设置组织名");
  }
  const targetDir = path.join(currentDirectory,name);
  log.info('vite8','准备创建的目录为%s',targetDir);
  //不推荐用exist,更推荐用access或lstate
  let exists = fs.existsSync(targetDir);
  if(exists){
    const files = await fs.readdir(targetDir);
    if(files.length>0){//目录 不为空
        const {overwrite} = await prompt({
            type:'confirm',
            name:'overwrite',
            message:'目标目录非空，是否要移除已经存在的目录?'
        });
        console.log('overwrite',overwrite);
        if(overwrite){
            await fs.emptyDir(targetDir);
        }else{
            throw new Error(red('X')+"操作被取消");
        }
    }
  }else{
    await fs.mkdirp(targetDir);//如果不存在会抛异常，创建目录
  }
  //准备好了一个空目录，等待拷贝文件了
  log.info('vite8','%s目录已经准备就绪',targetDir);