const userhome = require('userhome');
const fs = require('fs-extra');
const {CONFIG_NAME} = require('@vite8/settings');
const configPath = userhome(CONFIG_NAME);//C:\Users\zhangrenyang/.vite8.json
let config = {};
if(fs.existsSync(configPath)){
    config = fs.readJSONSync(configPath);
}
config.configPath=configPath;
module.exports = config;