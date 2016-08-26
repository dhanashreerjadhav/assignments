var fs  = require("fs");
fs.writeFileSync('demo.txt', "Hi, I am created using 'fs' core module");

console.log(fs.readFileSync('demo.txt').toString());