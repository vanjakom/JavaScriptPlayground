// static file http server
// serve files for application directory

var fs = require("fs");
var http = require("http");
var url = require("url");

http.createServer(function (req, res) {
	var request = url.parse(req.url, false);
	console.log("Serving request: " + request.pathname);

	var filename = request.pathname.slice(1);
	
	try {
		fs.realpathSync(filename);
	} catch (e) {
		res.writeHead(404);
		res.end();
	}

	var contentType = "text/plain";

	if (request.pathname.match(".js$")) {
		contentType = "text/javascript";
	} else if (request.pathname.match(".html$")) {
		contentType = "text/html";
	}

	fs.readFile(filename, function(err, data) {
		if (err) {
			res.writeHead(500);
			res.end();
			return;
		}

		res.writeHead(200, {"Content-Type": contentType});
		res.write(data);
		res.end();
	});	
}).listen(8000);

console.log("server started");
