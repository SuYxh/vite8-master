#!/usr/bin/env node
const yargs = require("yargs/yargs");
const configCmd = require('@vite8/config/command');
const createCmd = require('@vite8/create/command');
debugger
async function main() {
  const cli = yargs();
  cli
    .usage(`Usage: vite8 <command> [options]`)
    .demandCommand(1, "至少需要一个命令")
    .strict()
    .recommendCommands()
    .command(configCmd)
    .command(createCmd)
    .parse(process.argv.slice(2));
}
main().catch((err) => {
  console.log('catch');
  console.log(err);
});
