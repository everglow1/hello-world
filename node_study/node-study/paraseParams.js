// url: http://www.baidu.com/login.html?username=admin&password=123
// 做到检测地址，拿到信息

// 参数列表username=admin&password=123

let str = 'username=admin&password=123';
// 分割
let s1 = str.split('&')[0].split('=')
let s2 = str.split('&')[1].split('=')

console.log(s1, s2)