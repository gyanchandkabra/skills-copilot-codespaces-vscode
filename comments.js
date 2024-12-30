// Create web server 
// Start web server
// Create a route

// Load the http module to create an http server.
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  var url_parts = url.parse(request.url);
  var path = url_parts.pathname;
  var query = url_parts.query;
  console.log('path:', path);
  console.log('query:', query);

  // response.writeHead(200, {"Content-Type": "text/plain"});
  // response.end("Hello World\n");
  if (path == '/comments') {
    fs.readFile('comments.json', function(err, data) {
      if (err) {
        console.error(err);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.end("Not found\n");
        return;
      }

      response.writeHead(200, {"Content-Type": "application/json"});
      response.end(data);
    });
  } else {
    var filePath = '.' + path;
    if (filePath == './') {
      filePath = './index.html';
    }

    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
      case '.js':
        contentType = 'text/javascript';
        break;
      case '.css':
        contentType = 'text/css';
        break;
    }

    fs.readFile(filePath, function(error, content) {
      if (error) {
        if(error.code == 'ENOENT'){
          fs.readFile('./404.html', function(error, content) {
            response.writeHead(404, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
          });
        } else {
          response.writeHead(500);
          response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
          response.end();
        }
      } else {
        response.writeHead(200, { 'Content-Type': contentType });
        response.end(content, 'utf-8');
      }
    });
  }
});

// Listen on port 8000, IP defaults to