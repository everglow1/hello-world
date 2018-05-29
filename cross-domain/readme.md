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

  1、一个众所周知的问题，Ajax直接请求普通文件存在跨域无权限访问的问题，甭管你是静态页面、动态网页、web服务、WCF，只要是跨域请求，一律不准；

  2、不过我们又发现，Web页面上调用js文件时则不受是否跨域的影响（不仅如此，我们还发现凡是拥有"src"这个属性的标签都拥有跨域的能力，比如<script>、<img>、<iframe>）；

  3、于是可以判断，当前阶段如果想通过纯web端（ActiveX控件、服务端代理、属于未来的HTML5之Websocket等方式不算）跨域访问数据就只有一种可能，那就是在远程服务器上设法把数据装进js格式的文件里，供客户端调用和进一步处理；

  4、恰巧我们已经知道有一种叫做JSON的纯字符数据格式可以简洁的描述复杂数据，更妙的是JSON还被js原生支持，所以在客户端几乎可以随心所欲的处理这种格式的数据；

  5、这样子解决方案就呼之欲出了，web客户端通过与调用脚本一模一样的方式，来调用跨域服务器上动态生成的js格式文件（一般以JSON为后缀），显而易见，服务器之所以要动态生成JSON文件，目的就在于把客户端需要的数据装入进去。

  6、客户端在对JSON文件调用成功之后，也就获得了自己所需的数据，剩下的就是按照自己需求进行处理和展现了，这种获取远程数据的方式看起来非常像AJAX，但其实并不一样。

  7、为了便于客户端使用数据，逐渐形成了一种非正式传输协议，人们把它称作JSONP，该协议的一个要点就是允许用户传递一个callback参数给服务端，然后服务端返回数据时会将这个callback参数作为函数名来包裹住JSON数据，这样客户端就可以随意定制自己的函数来自动处理返回数据了。

  **方式三 通过document.domain跨域**

  比如，有一个页面，它的地址是http://www.damonare.cn/a.html ， 在这个页面里面有一个iframe，它的src是http://damonare.cn/b.html, 很显然，这个页面与它里面的iframe框架是不同域的，所以我们是无法通过在页面中书写js代码来获取iframe中的东西的

  这个时候，document.domain就可以派上用场了，我们只要把http://www.damonare.cn/a.html和http://damonare.cn/b.html这两个页面的document.domain都设成相同的域名就可以了。但要注意的是，document.domain的设置是有限制的，我们只能把document.domain设置成自身或更高一级的父域，且主域必须相同。

  在页面http://www.damonare.cn/a.html 中设置document.domain:

  `<iframe id = "iframe" src="http://damonare.cn/b.html" onload = "test()"></iframe>`
  `<script type="text/javascript">`
  `document.domain = 'damonare.cn';//设置成主域`
  `function test(){`
     ` alert(document.getElementById('￼iframe').contentWindow);//contentWindow 可取得子窗口的 window 对象`
 ` }`
`</script>`

在页面http://damonare.cn/b.html 中也设置document.domain:

`<script type="text/javascript">`
   ` document.domain = 'damonare.cn';//在iframe载入这个页面也设置document.domain，使之与主页面的``document.domain相同`
`</script>`

**通过location.hash跨域**

  因为父窗口可以对iframe进行URL读写，iframe也可以读写父窗口的URL，URL有一部分被称为hash，就是#号及其后面的字符，它一般用于浏览器锚点定位，Server端并不关心这部分，应该说HTTP请求过程中不会携带hash，所以这部分的修改不会产生HTTP请求，但是会产生浏览器历史记录。此方法的原理就是改变URL的hash部分来进行双向通信。每个window通过改变其他 window的location来发送消息（由于两个页面不在同一个域下IE、Chrome不允许修改parent.location.hash的值，所以要借助于父窗口域名下的一个代理iframe），并通过监听自己的URL的变化来接收消息。这个方式的通信会造成一些不必要的浏览器历史记录，而且有些浏览器不支持onhashchange事件，需要轮询来获知URL的改变，最后，这样做也存在缺点，诸如数据直接暴露在了url中，数据容量和类型都有限等

假如父页面是baidu.com/a.html,iframe嵌入的页面为google.com/b.html（此处省略了域名等url属性），要实现此两个页面间的通信可以通过以下方法。

  a.html传送数据到b.html

  a.html下修改iframe的src为google.com/b.html#paco

  b.html监听到url发生变化，触发相应操作

  b.html传送数据到a.html，由于两个页面不在同一个域下IE、Chr ome不允许修改parent.location.hash的值，所以要借助于父窗口域名下的一个代理iframe

  b.html下创建一个隐藏的iframe，此iframe的src是baidu.com域下的，并挂上要传送的hash数据，如src="http://www.baidu.com/proxy.html#data"

  proxy.html监听到url发生变化，修改a.html的url（因为a.html和proxy.html同域，所以proxy.html可修改a.html的url hash）

  a.html监听到url发生变化，触发相应操作

  **通过h5的postMessage方法跨域**

  高级浏览器Internet Explorer 8+, chrome，Firefox , Opera 和 Safari 都将支持这个功能。这个功能主要包括接受信息的"message"事件和发送消息的"postMessage"方法。比如damonare.cn域的A页面通过iframe嵌入了一个google.com域的B页面，可以通过以下方法实现A和B的通信

  A页面通过postMessage方法发送消息：

  `window.onload = function() {  `
  `  var ifr = document.getElementById('ifr');  `
  `  var targetOrigin = "http://www.google.com";  `
  `  ifr.contentWindow.postMessage('hello world!', targetOrigin);  `
`};`

  postMessage的使用方法：

  otherWindow.postMessage(message, targetOrigin);

  otherWindow:指目标窗口，也就是给哪个window发消息，是 window.frames 属性的成员或者由 window.open 方法创建的窗口

  message: 是要发送的消息，类型为 String、Object (IE8、9 不支持)

  targetOrigin: 是限定消息接收范围，不限制请使用 '*

  B页面通过message事件监听并接受消息:

  `var onmessage = function (event) {  `
`  var data = event.data;//消息  `
`  var origin = event.origin;//消息来源地址  `
`  var source = event.source;//源Window对象  `
`  if(origin=="http://www.baidu.com"){  `
`  console.log(data);//hello world!  `
`    }  `
`  };  `
`  if (typeof window.addEventListener != 'undefined') {  `
`    window.addEventListener('message', onmessage, false);  `
`  } else if (typeof window.attachEvent != 'undefined') {  `
`    //for ie  `
`    window.attachEvent('onmessage', onmessage);  `
`  }  `