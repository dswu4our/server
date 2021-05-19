var http = require("http");
var hostname = "127.0.0.1";
var port = 8100;

const server = http.createServer(function (req, res) {
  console.log("request : ", req);
  res.end("hello");
});

server.listen(port, hostname);

console.log("server on");
