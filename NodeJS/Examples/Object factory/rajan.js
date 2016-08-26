var names = require('./name');
console.log(names);
 var printFriend = names();
 printFriend.frndName = "ram";
console.log('Rajan is friend of ' + printFriend.frndName);