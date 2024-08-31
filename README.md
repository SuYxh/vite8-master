## 
- 创建5个包，都会放在当前仓库中，都会发到npm去



在我们这个cli中的
我们可动态的读取组织中的仓库和标签
支持github gitee

github 抽风
gitee 一天接口只能调几次


vite8 config 访问所有的配置
vite8 config GIT_TYPE github 配置git类型
vite8 config GIT_TYPE gitee 配置git类型
vite8 config GIT_TYPE  访问git类型

vite8 config ORG_NAME zhutemplate 配置组织名
vite8 config ORG_NAME  访问组织名







那如果内部版本依赖冲突了怎么办
只用一份的话，如果每个组件所依赖的包版本不一样咋办
lerna是单独安装node_modules, yarn workspace是统一安装node_modules, 那这两个不矛盾么

lerna功能和yarn workspace是重叠的，工作也有所不同
功能不要重叠
lerna 发布，不要用lerna来来安装依赖了
yarn 安装依赖
手写 npm ，6了
包必须放packages里吗
npm 查找就是向上查找，最终是全局，lerna 和 yarn 不冲突
lerna可以做微前端类似乾坤的微前端吗
yarn wrokSpace 都安装到外层的node_modules ,如果我想安装一个包的不同版本，它是怎么处理的
npm bin -g 是看npm的安装目录？
为什么我在根目录执行yarn install后 子项目目录也会产生node_modules目录？
老师,创建自己的模板的话, 必须建立组织么, 不能读取自己的仓库么?
比如说我们要写个组件库, 还必须创建一个组织啊?
码云老抽水
模板是否可以发布到npm管理呢？怎么记得vite是从npm上拉模板的
可以的 这个可以实现一下
不是用minimist，不用yargs吗
模版可以放在nPm里么？git不创建组织可以吗
yargs 比 commander 优势在哪
builder干什么的？
为啥这么吵
yargs 那功能比commander多多了
project1是咋生成的
@vite8中的@是lerna定义的吗
@组织名

@vite8/utils
vite8这个组织下面的utils
npm包的规范
key 是git_type
使用--mode dev来配置命令是不是可以忽略参数的顺序
不是 babel7 现在就是 @bable 是一个组织的意思
@babel/core @babel/preset-env
@vue
如果是公司项目放gitlab也能设置的吧
要获取到argv。slice（2）是{config: github}?

process.argv[1] 为什么是1？
0 是  cwd  argv 【1】是create
好像不是
name 是argv【1】

yarn link
有知道 @vite8/在哪里配置的吗？
注册到全局的，全局再指向当前目录
嗯嗯，想起来了
npm link过去的，是吧
哎呀周二不一定有时间看vie的实现
chDir那里没看懂，可以再讲一下吗
需要回去好好新消化一下



throw 会进入 catch 吗？
cwd 是  命令行的目录
executeNodeScript  能在讲讲么
不是你命令行执行的位置吗？
「多进程执行命




一方面如果你同时开执行多个子命令，生个子命令都可以开一个子进程，跑一个个CPU的核心，利用多核 
如果一命令崩溃了，不会影响其它命令执行
多进程执行命令提升性能」具体说了啥，能明确一下都做了啥提升性能吗，没看到什么显著的提升性能的点
被内部trycatch  catch住了
catch 掉了
preocess.pwd  只有在需要 自行 command 这些命令的时候需要变？ 为啥不是 操作文件的路径变化 而是命令行变化呢？

proceww.cwd();指命令执行的目录
process.chdir()修改当前目录

该目录那个还没怎么明白
为了  在不同的目录下面执行不同的子进程 所以改变命令行执行的路劲个
process.cwd() === __dirname 吗

__dirname永远不会变的
proces.cwd会改变
proces.chdir()

最后面的一部分内容是 要求有org 和 判断输出的文件路径是否存在 内容