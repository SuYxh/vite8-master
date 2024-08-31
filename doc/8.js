/* 
let allPlugins= ['a','a','b','c'];

console.log(Array.from(new Set(allPlugins))); */
let devDependencies= {
    "@babel/core": "^7.15.5",
    "@babel/preset-env": "^7.15.4",
    "@babel/preset-react": "^7.14.5",
    "babel-loader": "^8.2.2",
    "html-webpack-plugin": "^5.3.2",
    "webpack": "^5.52.0",
    "webpack-cli": "^4.8.0",
    "webpack-dev-server": "^4.1.0",
    "cli-plugin-xxx": "latest",
    "cli-plugin-router": "latest"
  };


let customPlugins = Object.keys(devDependencies).filter(npmName=>npmName.startsWith('cli-'));
console.log(customPlugins);
let pluginObj = {};
customPlugins.forEach(pluginName=>{
    pluginObj[pluginName]={};
})

console.log(pluginObj);