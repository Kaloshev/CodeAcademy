var printSay = require('./first');

var name = "nikola"
var main = function (){
    console.log("Nikola : " + printSay.sayBye("Petar"));
}

module.exports = {
    main,
    name
}