#### 跨域

  一个域名地址的组成：

  http://  www  .  adc.com  :  8080  /  script/jquery.js

  协议     子域名   主域名      端口号     请求资源地址

  端口号默认是8080，一般省略。

  当协议，子域名，主域名，端口号中任意一个不相同时，就算不同域

  不同域之间相互请求资源，就算**跨域**

  JavaScript处于安全方面的考虑，不允许跨域调用其它页面的对象。
  www.abc.com/index.html 调用  www.abc.com/server.php  (非跨域)
  www.abc.com/index.html 调用  www.hhh.com/server.php  (跨域)
  www.abc.com/index.html 调用  bbs.abc.com/server.php   (跨域)
  ...

  **处理跨域方法一  ： 代理**

  通过在同域名的web服务器端创建一个代理：
  北京服务器（域名：www.beijing.com）
  上海服务器（域名： www.sahnghai.com）

  比如早北京的web服务器的后台
  （www.beijing.com/proxy-shanghaiservice.php）来调用上海服务器
  （www.shanghai.com/service.php）的服务，然后把响应结果返回给前端，这样前端调用同域名的服务就和调用上海的服务器的服务效果相同了。

  在服务器端没有跨域，这相当于绕过浏览器端，自然就不存早跨域问题。

  **方式二 ：jsonp**

  jsonp可用于解决主流浏览器的跨域数据访问问题。

  Jsonp(JSON with Padding) 是 json 的一种"使用模式"，可以让网页从别的域名（网站）那获取资料，即跨域读取数据

  简单的理解为： 带callback的json就是jsonp