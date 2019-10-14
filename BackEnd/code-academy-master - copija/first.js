var sayHi = function (user) {
    console.log(`Hello, ${user}!`);
}
  
function sayBye(user) {
    // exho();
    return `Bye, ${user}!`;
}

function echo() {
    return 'Echo!';
}

function randomNumber (min, max) {
    return Math.floor(Math.random() * (max - min)) + min; 
}
  
//module.exports = sayHi;
module.exports = {
    sayHi,
    sayBye,
    randomNumber,
}
