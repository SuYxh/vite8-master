const spawn = require('cross-spawn');// child_process spawn
/**
 * 
 * @param {*} cwd 脚本的工作目录
 * @param {*} script node脚本
 * @param {*} args 传递给脚本的参数 JSON字符串
 */
async function executeNodeScript({cwd},script,args){
    return new Promise((resolve,reject)=>{
        let childProcess = spawn(
            process.execPath,//node的可执行文件路径
            ["--eval",script,JSON.stringify(args)],
            {cwd,stdio:'inherit'}//让子进程和父进程共享输出输出和错误流
        );
        childProcess.on('close',resolve);
    });
}

module.exports = executeNodeScript;
/* executeNodeScript({cwd:process.cwd()},"console.log(JSON.parse(process.argv[1]))",{id:1})

 */