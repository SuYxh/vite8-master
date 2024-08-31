
const {executeNodeScript} = require('@vite8/utils');
const {COMMAND_SOURCE} = require('@vite8/settings');
// <name> 必选项 [key]可选项 可给可不给
const command = {
    command:'create <name>',
    describe:'创建项目',
    builder:(yargs)=>{
        yargs.positional('name',{
            type:'string',
            describe:'项目名称'
        });
    },
    handler:async function(argv){
       //在这时开启一个子进程执行命令 你在哪个目录下执行命令，process.cwd()指向当前的工作目录
       let args  = { projectName:argv.name,currentDirectory:process.cwd()};
       //await executeNodeScript({cwd:__dirname},COMMAND_SOURCE,args);
       require('.')(args);
    }
}
module.exports = command;
/**
 * vite8 config    查看所有配置
 * vite8 GIT_TYPE  查看GIT_TYPE
 * vite8 GIT_TYPE  github 设置GIT_TYPE值为github
 */