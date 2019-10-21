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
  
//module.exports = sayHi;
module.exports = {
    sayHi,
    sayBye
}
