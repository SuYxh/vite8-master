const yargs = require('yargs/yargs');
const cli = yargs();
cli
.usage(`Usage: vite8 <command> [options]`)
.demandCommand(1,'至少需要一个命令')
.strict()
.recommendCommands()
.command({
    command:'create <name>',
    describe:'创建项目',
    builder:(yargs)=>{
        yargs.positional('name',{
            type:'string',
            describe:'项目名称'
        });
    },
    handler:async function(argv){
        console.log('argv',argv);
    }
})
.parse(process.argv.slice(2))

//process.argv命令行参数
//0 node可执行文件
//1 脚本自己


