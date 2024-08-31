.刚好  嘞了嘞了
黄妃妃你别学了  你学不会
vite 也可以创建react项目啊
vite只是一个构建工具，不限制框架
迟到几分钟，影响大吗
npm run init 这个init命令哪来的
npm init这是npm7.0最增加的功能
npm init vite
先下载 安装 create-vite这个包，然后执行
scripts自己配置的吧
迟到8分钟lerna是干嘛的。。
来晚了，lerna的功能是啥？
还没有lerna



npm init vite
create-vite
为什么去找create-vite而不是去找create-vite2呢？
是不是写组件库的话, 用lerna比较好啊, 单独发布每个组件可以.
刚才的debuggervite入口应该create-vite根目录下index.js
https://gitee.com/scottcoder/vite/blob/main/packages/create-vite/index.js
该发言可能违规，仅老师可见
这个文件
yarn workspace是用来管理多个package的node_modules，让多个包共享node_module
lerna 每个项目单独有node_modules安装依赖包
yarn workspace 会把依赖包都统一安装到根目录下的node_modules
如果不用这的话，每个package下都会有node_modules
lerna是对库的模块化
没声音啊
根pnpm区别是啥
pnpm最新包管理方案 
npm包原理
安装一个包的时候，先把把npm缓存里有没有，如果有拷贝到当前项目中
pnpm安装一个包的时候，先把缓存有没有，如果有不拷贝，直接引用缓存中的名
手写npm

组织名称不可用 vite8
vite2建好了
lerna用处多吗? 它的好处和缺点在哪里?
fetch也不错吧，比较喜欢fetch
learn 搭建库时候使用吧
axios 如果想获取公司内部的仓库信息的话如何解决？
settings里面没删掉
多了个逗号
多了个逗号
包比文件夹有啥好处
create下面的package多了个逗号
这个是多入口项目么
lerna单仓库多包管理
creat中的JSON多个逗号

这个 发布源 可以直接配置在 lerna.json中
内部包如何找自己引用的
lerna link 之后 直接写你包的名字就可
子目录下也会产生node_moudles目录吗？
yarn link 和lerna link的区别呢？
yarn和npm混用? 项目中这样搞想骂人哦
你哪里滋啦滋啦吗
这么链接有点乱啊
滋啦
吱吱的
对  声音有点问题
我以为电脑坏了
我还以为是我的问题
我也以为电脑问题
牛皮
跟 npm link 链接原理一样的吧？
原理是一样的

话筒该换一个了

yarn workspace 包名 add userhome
设计原则  高内聚 低耦合

1.选择我们的组织下的仓库和标签
2.把标签代码下载到临时模板目录里
3.把临时模板目录里的项目拷贝到当前目录中，安装依赖启动就可以



usehome 是用来获取 目标路径的？
取的是用户主目录
window  C:\Users\zhangrenyang
linux
root /root
普通用户 /home/用户名
promisify. 这个库  9 years ago  发布的
util node的内置库
组织 仓库 标签的关系是啥
感觉跟日常的写代码似的
userhome 是啥？
看看下载成功了没有


create-vite


execa是封装的child_process
 

 下次会开个课
 讲多进程与子进程与集群

 本次课程最核心 
 插件机制
 umi3 @vue/cli 


 如果有多个feature， featurePrompt 和 injectPrompts 怎么对应？？
 可以不对应
 


 
这个插件的功能是自动安装router的插件吗
改了package.json 添加一个cli-router开发依赖，

没太懂这个cli-plugin-router 是什么时机执行的，参数怎么传给他的？
改写内容用的什么插件？
CLI-PLUGIN-ROUTER
api 哪的？
cli-plugin-router还没写的
vue-cli
官方插件 @vue
民间插件 

空数组负值给两个不是最后还是空数组么
如果是数组 就不会走 

 [] 了吧

 么意思
这个思路可以把vue源代码转成react吗
imports里是什么

GeneratorAPI.injectImport 用来给 this.creator.imports[file]=[`import ReactDOM`]

creator里renderFiles要 渲染文件的时候 通过 ./codemod/injectImports方法修改源代码，向源代码中插入import语句
弹出的选项

prompt.js是什么？
讲讲vue-cli ui是咋开发的呢
prompt.js运行的时候会去读取这个文件，然后在命令行弹出一系列的对话选项
要把cli-plugin-router排除吧，要不然配置信息没有了
其实是没有问题的
因为官方插件和社区插件命名规范是不一样的
官方@vue/cli-plugin
民间vue-cli-plugin
找的时候 只找

老师 有点迷糊 我们讲的是vue的脚手架？ 不是react的么

脚手架跟技术 栈无关
vue 
react


那打包工具用的啥 可以用webpack 也可以用vite rollup parce
 
xxx.js是拷贝过去的？
像taro和uni-app 也是一个脚手架吗？有啥区别吗？
能不写死在package.json 里。弹窗那种插入么？