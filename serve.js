#!/usr/bin/env node
/**
 * Minimal zero-dependency static file server for the NEPAL — Himalayan
 * Timepieces demo store.
 *
 * The store is a self-contained Design Component (`NEPAL Watches.dc.html`) whose
 * runtime (`support.js`) fetches sibling assets over HTTP, so it must be served
 * rather than opened via file://. Run `npm start` (or `node serve.js`) and open
 * the printed URL.
 *
 *   PORT=3000 node serve.js   # override the default port
 */
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = parseInt(process.env.PORT || '4173', 10);
const INDEX = 'NEPAL Watches.dc.html';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  } catch {
    res.writeHead(400).end('Bad Request');
    return;
  }
  if (pathname === '/') pathname = '/' + INDEX;

  // Resolve within ROOT and reject any path that escapes it (path traversal).
  const filePath = path.join(ROOT, pathname);
  const rel = path.relative(ROOT, filePath);
  if (rel.startsWith('..') || path.isAbsolute(rel)) {
    res.writeHead(403).end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not Found');
      return;
    }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`NEPAL demo store running at http://localhost:${PORT}/`);
  console.log('Press Ctrl+C to stop.');
});
