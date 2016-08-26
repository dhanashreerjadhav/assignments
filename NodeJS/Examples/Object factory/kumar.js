var names = require('./name');
 console.log(names);
 var printFriend = names();
 
 printFriend.frndName = "gopal";
console.log('Kumar is friend of ' + printFriend.frndName);