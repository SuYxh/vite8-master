exports.log = require('./log');
exports.config = require('./config');
exports.executeNodeScript = require('./executeNodeScript');
exports.request = require('./request');
exports.withLoading = require('./withLoading');
exports.loadModule = require('./loadModule');
exports.extractCallDir = require('./extractCallDir');
exports.mergeDeps = require('./mergeDeps');
exports.writeFileTree = require('./writeFileTree');
exports.isObject = val => typeof val === 'object'
exports.isString = val => typeof val === 'string'