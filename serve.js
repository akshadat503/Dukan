const http = require('http');
const fs = require('fs');
const path = require('path');

let port = parseInt(process.env.PORT, 10) || 4173;
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

function startServer(attemptPort) {
  const server = http.createServer((req, res) => {
    let cleanUrl = req.url.split('?')[0];
    let safePath = path.normalize(decodeURIComponent(cleanUrl));

    // Normalize root path
    if (safePath === '/' || safePath === '\\' || safePath === '.') {
      safePath = 'index.html';
    }

    let filePath = path.join(__dirname, safePath);
    let ext = path.extname(filePath).toLowerCase();

    // If client requested a path without extension (e.g. /home, /problem), fallback to index.html
    if (!ext && !fs.existsSync(filePath)) {
      filePath = path.join(__dirname, 'index.html');
      ext = '.html';
    }

    // Special handling for favicon.ico fallback
    if ((safePath === 'favicon.ico' || safePath === '\\favicon.ico') && !fs.existsSync(filePath)) {
      if (fs.existsSync(path.join(__dirname, 'favicon.svg'))) {
        filePath = path.join(__dirname, 'favicon.svg');
        ext = '.svg';
      }
    }

    let contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code === 'ENOENT') {
          console.warn(`[404 NOT FOUND] ${req.method} ${req.url} -> Attempted path: ${filePath}`);
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found: ' + req.url);
        } else {
          console.error(`[500 ERROR] ${req.method} ${req.url}:`, err);
          res.writeHead(500);
          res.end('Server Error: ' + err.code);
        }
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${attemptPort} is already in use.`);
      console.log(`Attempting next port ${attemptPort + 1}...`);
      startServer(attemptPort + 1);
    } else {
      console.error('Server error:', err);
    }
  });

  server.listen(attemptPort, () => {
    console.log(`\n==================================================`);
    console.log(`  🚀 Dukaan Web App is running!`);
    console.log(`  Local URL:  http://localhost:${attemptPort}/`);
    console.log(`==================================================\n`);
  });
}

startServer(port);
