const http = require("http");
const url = require("url");
const fs = require("fs");

http
  .createServer(function (req, res) {
    const pathname = url.parse(req.url, true).pathname;
    if (pathname == "/favicon.ico") return res.end();
    let filename;
    if (pathname == "/") filename = "./index.html";
    else filename = "." + pathname + ".html";
    fs.readFile(filename, function (err, data) {
      if (err) {
        fs.readFile("./404.html", function (err2, data2) {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(data2);
        });
        return res.end();
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  })
  .listen(8080, () => {
    console.log("Server made");
  });
