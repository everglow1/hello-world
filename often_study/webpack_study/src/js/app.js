// alert(require('./people.js'));


// let people = require('./people.js'); 
// console.log(people[0].name);

let people = require('./people.js');
let $ = require('jquery');
require("../css/style.css");
// $("body").append("<h1>"+ people[0].name + "</h1>")
$.each(people,function(key,value) {
    $("body").append("<h1>"+ people[key].name + "</h1>")
});
