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
    console.log(filename);
    if (
      filename == "./index.html" ||
      filename == "./contact-me.html" ||
      filename == "./about.html"
    ) {
      console.log("true");
      fs.readFile(filename, function (err, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      });
    } else {
      console.log("false");
      fs.readFile("./404.html", function (err, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      });
    }
  })
  .listen(8080, () => {
    console.log("Server made");
  });
