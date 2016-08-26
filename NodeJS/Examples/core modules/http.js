var http = require('http');

function madeRequest(req, res){
		res.writeHead(200, {"content-Type": "text/plain"});
		res.write("Hello npm node");
		res.end();
}

http.createServer(madeRequest).listen(8888);

console.log("Server is started...");