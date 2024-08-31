
const {executeNodeScript} = require('@vite8/utils');
const {COMMAND_SOURCE} = require('@vite8/settings');
// <name> 必选项 [key]可选项 可给可不给
const command = {
    command:'config [key] [value]',
    describe:'设置或者查看配置项，GIT_TYPE表示仓库来源，ORG_NAME配置组织名称',
    builder:(yargs)=>{
    },
    handler:async function(argv){
        //在这时开启一个子进程执行命令
       //require('./index.js')(argv);
       await executeNodeScript({cwd:__dirname},COMMAND_SOURCE,argv);
    }
}
module.exports = command;
/**
 * vite8 config    查看所有配置
 * vite8 GIT_TYPE  查看GIT_TYPE
 * vite8 GIT_TYPE  github 设置GIT_TYPE值为github
 */