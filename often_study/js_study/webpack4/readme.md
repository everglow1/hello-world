### 为什么要使用Webpack

现今的很多网页其实可以看做是功能丰富的应用，它们拥有着复杂的JavaScript代码和一大堆依赖包。为了简化开发的复杂度，前端社区涌现出了很多好的实践方法

  **模块化**，让我们可以把复杂的程序细化为小的文件;

  类似于TypeScript这种在JavaScript基础上拓展的开发语言：使我们能够实现目前版本的JavaScript不能直接使用的特性，并且之后还能转换为JavaScript文件使浏览器可以识别；

  Scss，less，stylus等CSS预处理器
  ...
这些改进确实大大的提高了我们的开发效率，但是利用它们开发的文件往往需要进行额外的处理才能让浏览器识别,而手动处理又是非常繁琐的，*这就为WebPack类的工具的出现提供了需求*。

### 什么是Webpack

  Webpack可以看做是模块打包机器： 它所做的事情是，分析你的项目结构，找到JavaScript模块以及其它一些浏览器不能直接运行的扩展语言（stylus， Typescript）等，并将其转换为合适的格式供浏览器使用。

  **Webpack的工作方式：**

  把你的项目作为一个整体，通过一个给定的主文件（如：index.js），Webpack将从这个文件开始找到你的项目的所有依赖文件，使用loader处理它们，最后打包为一个（或者多个）浏览器可以识别的JavaScript文件

  **webpack能识别的只有js。所以需要很多loader。**

#### Webpack4

  webpack --mode=development  // 开发环境（开发环境用的）

  webpack --mode=production   // 生产环境（上线用到的）

  webpack --config=config/webpack.dev.js    // 打包

  webpack-dev-server --config=config/webpack.dev.js   // 启动服务器，并实时更新。 对配置进行修改，都需要重新启动

  webpack 

  webpack-cli 

  webpack-dev-server

  babel-preset-env

  babel-loader

  babel-core

  style-loader

  css-loader 

  html-loader 

  extract-loader

  file-loader 
  
  url-loader

  