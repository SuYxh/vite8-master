

async function withLoading(message,fn,...args){
  const ora = await import('ora');//用来在控制台显示loading效果的库
  const spnner = ora.default(message);
  spnner.start();
  const result = await fn(...args);
  spnner.succeed();
  return result;
}
module.exports = withLoading;
/**
 * 如何在 node中使用 es module
 * 1.mjs
 * 2.可以使用webpack打包
 * 3.await import()
 */