#### window
  window对象不但充当全局作用域，而且表示浏览器窗口。

  浏览器窗口的内部宽度和高度。内部宽高是指除去菜单栏、工具栏、边框等占位元素后，用于显示网页的净宽高。

  兼容性：IE<=8不支持。
  window.innerWidth
  window.innerHeight
浏览器整个窗口的宽高
  window.outerWidth
  window.outerHeight

  **navigator**
navigator对象表示浏览器的信息，最常用的属性包括：

  navigator.appName：浏览器名称；
  navigator.appVersion：浏览器版本；
  navigator.language：浏览器设置的语言；
  navigator.platform：操作系统类型；
  navigator.userAgent：浏览器设定的User-Agent字符串。

  **screen**
screen对象表示屏幕的信息，常用的属性有：

  screen.width：屏幕宽度，以像素为单位；
  screen.height：屏幕高度，以像素为单位；
  screen.colorDepth：返回颜色位数，如8、16、24。

location
location对象表示当前页面的URL信息。例如，一个完整的URL：

`http://www.example.com:8080/path/index.html?a=1&b=2#TOP`

  可以用location.href获取

  要获得URL各个部分的值，可以这么写：

  location.protocol; // 'http'
  location.host; // 'www.example.com'
  location.port; // '8080'
  location.pathname; // '/path/index.html'
  location.search; // '?a=1&b=2'
  location.hash; // 'TOP'

  **document**

document对象表示当前页面。由于HTML在浏览器中以DOM形式表示为树形结构，document对象就是整个DOM树的根节点。

document的title属性是从HTML文档中的<title>xxx</title>读取的，但是可以动态改变：

`document.title = '努力学习JavaScript!';`   // 网页的标题就会改为 ‘努力学习JavaScript’

要查找DOM树的某个节点，需要从document对象开始查找。最常用的查找是根据ID和Tag Name。

用document对象提供的getElementById()和getElementsByTagName()可以按ID获得一个DOM节点和按Tag名称获得一组DOM节点：

document对象还有一个cookie属性，可以获取当前页面的Cookie。

Cookie是由服务器发送的key-value标示符。因为HTTP协议是无状态的，但是服务器要区分到底是哪个用户发过来的请求，就可以用Cookie来区分。当一个用户成功登录后，服务器发送一个Cookie给浏览器，例如user=ABC123XYZ(加密的字符串)...，此后，浏览器访问该网站时，会在请求头附上这个Cookie，服务器根据Cookie即可区分出用户。

Cookie还可以存储网站的一些设置，例如，页面显示的语言等等。

JavaScript可以通过document.cookie读取到当前页面的Cookie：

`document.cookie`

**history**

history对象保存了浏览器的历史记录，JavaScript可以调用history对象的back()或forward ()，相当于用户点击了浏览器的“后退”或“前进”按钮。

这个对象属于历史遗留对象，对于现代Web页面来说，由于大量使用AJAX和页面交互，简单粗暴地调用history.back()可能会让用户感到非常愤怒。

新手开始设计Web页面时喜欢在登录页登录成功时调用history.back()，试图回到登录前的页面。这是一种错误的方法。

任何情况，你都不应该使用history这个对象了。

#### DOM

  由于HTML文档被浏览器解析后就是一棵DOM树，要改变HTML的结构，就需要通过JavaScript来操作DOM。

  始终记住DOM是一个树形结构。操作一个DOM节点实际上就是这么几个操作：

    更新：更新该DOM节点的内容，相当于更新了该DOM节点表示的HTML的内容；

    遍历：遍历该DOM节点下的子节点，以便进行进一步操作；

    添加：在该DOM节点下新增一个子节点，相当于动态增加了一个HTML节点；

    删除：将该节点从HTML中删除，相当于删掉了该DOM节点的内容以及它包含的所有子节点。

  在操作一个DOM节点前，我们需要通过各种方式先拿到这个DOM节点。最常用的方法是document.getElementById()和document.getElementsByTagName()，以及CSS选择器document.getElementsByClassName()。

  由于ID在HTML文档中是唯一的，所以document.getElementById()可以直接定位唯一的一个DOM节点。document.getElementsByTagName()和document.getElementsByClassName()总是返回一组DOM节点。要精确地选择DOM，可以先定位父节点，再从父节点开始选择，以缩小范围。

  第二种方法是使用querySelector()和querySelectorAll()，需要了解selector语法，然后使用条件来获取节点，更加方便

   通过querySelector获取ID为q1的节点：
  `var q1 = document.querySelector('#q1');`

   通过querySelectorAll获取q1节点内的符合条件的所有节点：
  `var ps = q1.querySelectorAll('div.highlighted > p');`

  *注意：低版本的IE<8不支持querySelector和querySelectorAll。IE8仅有限支持*

  **更新DOM**

  拿到一个DOM节点后，我们可以对它进行更新。

  可以直接修改节点的文本，方法有两种：

  一种是修改innerHTML属性，这个方式非常强大，不但可以修改一个DOM节点的文本内容，还可以直接通过HTML片段修改DOM节点内部的子树：

  第二种是修改innerText或textContent属性，这样可以自动对字符串进行HTML编码，保证无法设置任何HTML标签

  **插入DOM**

  当我们获得了某个DOM节点，想在这个DOM节点内插入新的DOM，应该如何做？

  如果这个DOM节点是空的，例如，<div></div>，那么，直接使用innerHTML = '<span>child</span>'就可以修改DOM节点的内容，相当于“插入”了新的DOM节点。

  如果这个DOM节点不是空的，那就不能这么做，因为innerHTML会直接替换掉原来的所有子节点。


  有两个办法可以插入新的节点。一个是使用appendChild，把一个子节点添加到父节点的最后一个子节点

  insertBefore
  如果我们要把子节点插入到指定的位置怎么办？可以使用parentElement.insertBefore(newElement, referenceElement);，子节点会插入到referenceElement之前。

   **删除DOM**

   删除一个DOM节点就比插入要容易得多。

  要删除一个节点，首先要获得该节点本身以及它的父节点，然后，调用父节点的removeChild把自己删掉：

    