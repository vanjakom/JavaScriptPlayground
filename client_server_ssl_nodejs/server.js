var sys = require("sys");
var fs = require("fs");
var https = require("https");

var options = {
  key: fs.readFileSync("keys/server.key"),
  cert: fs.readFileSync("certs/server.crt"),
  ca: fs.readFileSync("ca/ca.crt"),
  requestCert: true,
  rejectUnauthorized: false
};

https.createServer(options, function (req, res) {
  res.writeHead(200);
  sys.puts("request from: " + req.connection.getPeerCertificate().subject.CN);
  res.end("Hello World, " + req.connection.getPeerCertificate().subject.CN + "\n");
}).listen(8000);

sys.puts("server started");