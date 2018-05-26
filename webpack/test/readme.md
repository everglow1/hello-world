#### 默认情况

  在根目录下，新建src目录/index.js文件。 `webpack --mode=develpoment|production`
  会自动打包并生成dist目录和main.js的打包文件。

#### babel

  在webpack中使用babel的时候，首先要安装babel-core，这是babel编译库的核心包

  `npm install babel-core --save-dev`

  webpack中对js文件，我们要进行编译，就需要配置，在webpack中，需要用到babel-loader来使用babel

  `npm install babel-loader --save-dev`

  理解preset这个概念,也就是在babel编译之前，babel需要知道你的编译规则，到底是以什么样的规范去编译。

  如果需要按照es6的标准编译，那么安装一个 babel-preset-es2015，如果要按照es7来编译，那么就安装babel-preset-es2016:

  `npm install babel-es2016 --save-dev`

  一般来说，如果你想用最新的规范做编译，直接安装babel-preset-env就可以了，它包含了 babel-preset-es2015, babel-preset-es2016, and babel-preset-es2017，等价于babel-preset-latest，可以编译所有最新规范中的代码：

  `npm install babel-preset-env --save-dev`

  .babelrc文件 配置babel

  babel-polyfill, babel值负责对语法进行编译，不转换新的api，当我们写尖头函数，babel会帮你把它编译成普通函数，这没有任何问题，但是，比如说我们代码里使用了promise，babel打包出来的代码其实还是promise，在低版本浏览器里，promise并不支持。所以就需要
  babel-polyfill，来兼容低版本的浏览器。
  
  `npm install babel-polyfill --save-dev`
  然后在项目中使用一下它，你的代码就不存在刚才提到的兼容性问题了。

  `import 'babel-polyfill'`

  但是polyfill会污染全局环境，还有就是会造成代码冗余，  babel-plugin-transform-runtime，使用这个插件,可以解决全局污染和代码冗余问题
  `npm install babel-plugin-transform-runtime`
  `npm install babel-runtime`
  
#### 图片打包

  html-loader 和file-loader

  html-loader : 可以正常在html文件中使用src
  file-loader : 给文件取名。

#### 热更新

  启动一个服务器，代码改变，自动刷新页面。不需要手动刷新，（html文件不能自动刷新）
  js,css自动刷新

  webpack-dev-server

  webpack-dev-server --inline -hot --config=config/webapck.dev.js

#### node服务器

  `npm install express --save-dev`

  *注： 在node环境下使用es6需要转码。node对es6目前支持度不高。*

  `npm install babel-register`    在引入即可。

  对更改的文件进行监控，编译,专业点叫做伺服器

  `npm install webpack-dev-middleware --save-dev`

  webpack-hot-middleware 是用来进行页面的热重载的

  `npm install webpack-hot-middleware --save-dev`
  *注：使用webpack-hot-middleware还需一些其他配置*

  可以在webpack.dev.js的plugins中，实例化一个webpack.HotModuleReplacementPlugin()，  并在entry文件中，引入  require('webpack-hot-middleware/client')


  以上两个组合可以实现页面的热刷新工作，但是并不会对htmlwen文件页面热刷新。

  *注：对于配置文件的改变不会更新,比如启动服务器文件，webapck配置文件，package.json文件等*

#### nodemon

  用于项目代码发生变化时(所有代码的变化，包括webpackp.dev.js,package.json)可以自动重启，nodemon 本意是检测项目变化的，对项目做监控的。重启node只是它的一个功能。

 **实现客户端更新 html文件改变页面刷新**

  借助插件  `npm install html-webpack-plugin --save-dev`

  在webpack.dev.js的plugins中， 实例化一个HtmlWebpackPlugin
  在entry入口文件 require('webpack-hot-middleware/client?reload=true')

  **解决重复编译问题**

  `npm install webpack-mild-compile--save-dev`


  