const fs = require('fs-extra');
const path = require('path');
const {log,config} = require('@vite8/utils');
const {red} = require('chalk');
const Creator = require('./lib/Creator');
const execa = require('execa');
const getPromptModules = require('./lib/getPromptModules');
async function factory(argv){
  const {projectName,currentDirectory}=argv;
  const {GIT_TYPE,ORG_NAME} = config;
  if(!GIT_TYPE){
    throw new Error(red('X')+"还没有设置仓库类型");
  }
  if(!ORG_NAME){
    throw new Error(red('X')+"还没有设置组织名");
  }
  const projectDir = path.join(currentDirectory,projectName);
  log.info('vite8','创建项目的目录为%s',projectDir);
  const promptModules =  getPromptModules();
  console.log('promptModules',promptModules);//函数的数组
  const creator = new Creator(projectName,projectDir,promptModules);
  await creator.create();
  
  //启动项目
  await execa('npm',['run','dev'],{cwd:projectDir,stdio:'inherit'});
}
module.exports = factory;