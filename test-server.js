const http = require('http');

const endpoints = [
  '/',
  '/css/design-system.css',
  '/css/components.css',
  '/css/sections.css',
  '/js/offline-simulator.js',
  '/js/phone-showcase.js',
  '/js/ai-pipeline.js',
  '/js/architecture-flow.js',
  '/js/app.js',
  '/assets/images/craft-pottery.jpg',
  '/assets/images/craft-textile.jpg',
  '/assets/images/craft-brass.jpg'
];

async function testEndpoint(endpoint) {
  return new Promise((resolve) => {
    http.get(`http://localhost:4173${endpoint}`, (res) => {
      let size = 0;
      res.on('data', chunk => size += chunk.length);
      res.on('end', () => {
        resolve({ endpoint, status: res.statusCode, size, contentType: res.headers['content-type'] });
      });
    }).on('error', (err) => {
      resolve({ endpoint, error: err.message });
    });
  });
}

(async () => {
  console.log('--- TESTING SERVER ENDPOINTS ---');
  for (const ep of endpoints) {
    const result = await testEndpoint(ep);
    if (result.error) {
      console.error(`FAIL: ${ep} -> ${result.error}`);
    } else {
      console.log(`OK: ${ep} -> Status: ${result.status}, Size: ${result.size} bytes, Type: ${result.contentType}`);
    }
  }
})();
