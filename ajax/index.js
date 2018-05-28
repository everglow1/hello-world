var request = new XMLHttpRequest();

// 兼容ie等不支持xhr对象的浏览器
var xhr;
if (window.XMLHttpRequest) {
  xhr = new XMLHttpRequest();
} else {
  xhr = new ActiveXObject('Microsoft.XMLHTTP'); // IE5 IE6
}