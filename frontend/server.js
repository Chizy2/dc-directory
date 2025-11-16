const next = require('next');
const http = require('http');

// VPS deployment - use port 5050
const PORT = process.env.PORT || 5050;
const HOST = process.env.HOST || '0.0.0.0';

const app = next({ 
  dev: process.env.NODE_ENV !== 'production',
  dir: __dirname
});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  http.createServer((req, res) => {
    handle(req, res);
  }).listen(PORT, HOST, () => {
    console.log(`🚀 Frontend running on ${HOST}:${PORT}`);
    console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 Access at: http://${HOST}:${PORT}`);
  });
}).catch((ex) => {
  console.error('❌ Failed to start Next.js server:', ex);
  process.exit(1);
});
