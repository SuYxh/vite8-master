
exports.CONFIG_NAME = '.vite8.json';
exports.COMMAND_SOURCE = `
const args = JSON.parse(process.argv[1]);
const factory = require('.');
factory(args);
`;
// 存放模板的临时目录
exports.TEMPLATES = '.vite8_templates';