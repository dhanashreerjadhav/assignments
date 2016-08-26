var http  = require('http');

function myServer(req, res){
	console.log("we have request, lets process this");
	console.log(req.url);
	res.writeHead(200, {"Content-Type" : "text/plain"});
	res.write("Hello World, End");
	res.end();
}

http.createServer(myServer).listen(8080);

console.log('server is started');