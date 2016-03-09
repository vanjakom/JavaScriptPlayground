var https = require('https');
var fs = require("fs");

var options = {
	host: 'localhost',
	port: 8000,
	path: '/test',
	method: 'GET',
	key: fs.readFileSync("keys/userB.key"),
	cert: fs.readFileSync("certs/userB.crt"),
	ca: fs.readFileSync("ca/ca.crt"),
	rejectUnauthorized: false
};

var req = https.request(options, function(res) {
	console.log("statusCode: ", res.statusCode);
	console.log("headers: ", res.headers);
	
	res.on('data', function(d) {
    	process.stdout.write(d);
  	});
});

req.end();

req.on('error', function(e) {
	console.error(e);
});