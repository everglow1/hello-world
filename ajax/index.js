var request = new XMLHttpRequest();

// 兼容ie等不支持xhr对象的浏览器
var xhr;
if (window.XMLHttpRequest) {
  xhr = new XMLHttpRequest();
} else {
  xhr = new ActiveXObject('Microsoft.XMLHTTP'); // IE5 IE6
}
// 发送get请求
xhr.open('GET', 'get.php', true);
xhr.send();

// 发送post请求
xhr.open('POST', 'create.php', true);
// 一定要写在open和send之间，不然会出错。
xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
xhr.send('name=dog&sex=男');



var request = new XMLHttpRequest();
request.open('get', 'get.php', true);
request.send();
request.onreadystatechange = function () {
  if (request.readyState === 4 && request.status === 200) {
    // do something
  }
}