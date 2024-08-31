const fs = require('fs-extra');
const {log,config} = require('@vite8/utils');

async function factory(argv){
  const {key,value} = argv;
  log.info('vite8','key=%s,value=%s',key,value);
  if(key&&value){
    config[key] = value;
    await fs.writeJSON(config.configPath,config,{spaces:2});
    log.info('vite8','key=%s,value=%s已经成功保存至%s',key,value,config.configPath);
  }else if(key){
    console.log('%s=%s',key,config[key]);
  }else{
    console.log(config);
  }
}
module.exports = factory;