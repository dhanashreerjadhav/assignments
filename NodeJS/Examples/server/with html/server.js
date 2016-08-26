var http  = require('http');
var fs  = require('fs');

function myServer(req, res){
	res.writeHead(200, {"Content-Type" : "text/html"});
	fs.createReadStream("./index.html").pipe(res);
	//res.end();
}

http.createServer(myServer).listen(8080);

console.log('server is started');