//Create web server 
//create a web server that listens for requests on port 3000 and serves the comments.html file
//to any client that accesses the server. 
//The comments.html file should be served using the fs module and the readFileSync method.

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  const html = fs.readFileSync('./comments.html', 'utf8');
  res.end(html);
});

server.listen(3000, () => {
  console.log('Server is running...');
});