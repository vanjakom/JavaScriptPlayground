// static file http server
// serve files for application directory

var fs = require("fs");
var http = require("http");
var url = require("url");

function handleStaticFileRequest(req, res) {
	var request = url.parse(req.url, false);
	var filename = request.pathname.slice(1);
	
	console.log("Serving static file request: " + request.pathname);
	
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
	} else if (request.pathname.match(".css$")) {
		contentType = "text/css";
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
}

function handleDynamicRequest(req, res) {
	var request = url.parse(req.url, false);

	console.log("Serving dynamic request: " + request.pathname);
	
	res.writeHead(200, {"Content-Type": "text/json"});
	res.write('{"status":"ok"}');
	res.end();
}

http.createServer(function (req, res) {
	var request = url.parse(req.url, false);
	
	if (request.pathname.indexOf("/dynamic") == 0) {
		handleDynamicRequest(req, res);
	} else {
		handleStaticFileRequest(req, res);
	}
}).listen(8000);

console.log("server started");
