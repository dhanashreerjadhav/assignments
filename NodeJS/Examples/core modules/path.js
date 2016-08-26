var path = require('path');

var myFilePath_one = "desktop/nodejs///modules/demo.txt"
var myFilePath_two = "desktop/nodejs/modules/demo.txt"

console.log(path.normalize(myFilePath_one));

console.log(path.dirname(myFilePath_two));

console.log(path.basename(myFilePath_two));

console.log(path.extname(myFilePath_two));