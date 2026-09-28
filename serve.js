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
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.apk': 'application/vnd.android.package-archive'
};

function startServer(attemptPort) {
  const server = http.createServer((req, res) => {
    let cleanUrl = req.url.split('?')[0];

    // Browser devtools or well-known probe requests
    if (cleanUrl.startsWith('/.well-known/')) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end('{}');
      return;
    }

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

    // Special handling for favicon requests
    if (safePath === 'favicon.ico' || safePath === '\\favicon.ico' || safePath === 'favicon.png' || safePath === '\\favicon.png') {
      filePath = path.join(__dirname, 'assets', 'images', 'shilpsetu-logo.png');
      ext = '.png';
    }

    let contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Check if file exists
    fs.stat(filePath, (statErr, stats) => {
      if (statErr || !stats.isFile()) {
        console.warn(`[404 NOT FOUND] ${req.method} ${req.url} -> Attempted path: ${filePath}`);
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found: ' + req.url);
        return;
      }

      // Support HTTP Range requests for video/audio seeking
      const range = req.headers.range;
      if (range && (ext === '.mp4' || ext === '.webm')) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;
        const chunksize = (end - start) + 1;
        const fileStream = fs.createReadStream(filePath, { start, end });
        res.writeHead(206, {
          'Content-Range': `bytes ${start}-${end}/${stats.size}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': contentType,
        });
        fileStream.pipe(res);
      } else {
        res.writeHead(200, {
          'Content-Length': stats.size,
          'Content-Type': contentType,
          'Accept-Ranges': 'bytes'
        });
        fs.createReadStream(filePath).pipe(res);
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
    console.log(`  🚀 ShilpSetu Web App is running!`);
    console.log(`  Local URL:  http://localhost:${attemptPort}/`);
    console.log(`==================================================\n`);
  });
}

startServer(port);
