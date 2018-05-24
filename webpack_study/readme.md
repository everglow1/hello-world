#### webpack4

devDependencies  里面的插件只用于开发环境，不用于生产环境

dependencies  是需要发布到生产环境的。

比如我们写一个项目要依赖于jQuery，没有这个包的依赖运行就会报错，这时候就把这个依赖写dependencies

我们使用的一些构建工具比如glup、webpack这些只是在开发中使用的包，上线以后就和他们没关系了，所以将它写入devDependencies

###### 全局安装和本地安装

**全局安装**

  全局安装是安装到全局环境中，包安装在Node目录下的node_modules文件下,npm root -g查看全局安装目录。

  `npm root -g`

  `C:\Users\Administrator\AppData\Roaming\npm\node_modules`
**调用方式**

  全局安装后可以供命令行(command line)使用，用户可以在命令行中直接运行该组件包支持的命令。

**本地安装**

  包安装在指定项目的node_modules文件夹下。

**调用方式**

  本地安装后可以直接通过require()的方式引入项目中node_modules目录下的模块

**为什么全局安装后还要本地安装**

  1. 在js实例代码中，默认下node.js会在NODE_PATH和目前js所在项目下的node_modules文件夹下去寻找模块，因此，如果只是全局安装，不能直接通过require()的方式去引用模块，需要手动解决包路径的配置问题，当然你也可以复制全局安装的node_modules文件夹到项目下，还有办法可以选择将环境变量的NODE_PATH设置为C:\Program Files\nodejs。

  2. 对于包的更新不好管理，可能你需要为每个包重新命名，如gulp@3.8.1、gulp@3.9.1...，为了区别不同项目使用指定的包，保证模块之间的相互依赖（这块下面会介绍），区别每个项目正常运行。

  因此，不推荐只全局安装


**本地安装的重要性**

  每一次的更新可能带来不一样的功能，在多人合作、发布模块到npmjs社区、上传到github给其他人使用时，保留模块的版本信息可用于下载指定的版本号显得特别重要。

  本地安装可以让每个项目拥有独立的包，不受全局包的影响，方便项目的移动、复制、打包等，保证不同版本包之间的相互依赖，这些优点是全局安装难以做到的。

  据node团队介绍，本地安装包对于项目的加载会更快。

#### webpack-dev-server

  热更新
  打包会在缓存，不显示在dist文件。

#### babel转译

  babel-cli -g
  babel-core
  babel-plugin-transform-es2015-arrow-functions
  .babelrc文件（它是json文件）， 配置所用

  polyfill: 指的是“用于实现浏览器不支持原生功能的代码”
  
  babel-preset-env  环境变量 (这个可以帮我们自动下载一些插件，不需要一个一个安装)

  transform

  把es6转译成浏览器能识别的es5，因为并不是所有浏览器都支持es6的语法。

  Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。

  举例来说，ES6在Array对象上新增了Array.from方法。Babel就不会转码这个方法。如果想让这个方法运行，必须使用babel-polyfill，为当前环境提供一个垫片。

#### 脚手架

  使用express框架解决后端服务。

  配置服务器，启动index.html页面。

  webpack-dev-middleware  // 监听变化。

  webpack-hot-middleware  // 热更新