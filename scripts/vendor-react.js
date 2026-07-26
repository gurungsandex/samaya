#!/usr/bin/env node
/**
 * Populate vendor/ with the React + ReactDOM UMD builds the store's runtime
 * expects, so it can load them locally instead of from the public CDN
 * (unreachable on locked-down networks). Runs automatically before `npm start`
 * via the "prestart" hook, and is a no-op once the files exist.
 *
 * The builds are pulled from the npm registry (publicly reachable) and their
 * bytes are verified against the exact Subresource-Integrity hashes pinned in
 * support.js, so a corrupted or substituted download is rejected rather than
 * served. Zero dependencies: fetch + gunzip + a tiny tar reader.
 */
'use strict';

const https = require('https');
const zlib = require('zlib');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const VENDOR = path.join(__dirname, '..', 'vendor');

// entry: file inside the package tarball; sri: sha384 hash pinned in support.js.
const WANT = [
  {
    pkg: 'react', version: '18.3.1',
    entry: 'package/umd/react.production.min.js',
    out: 'react.production.min.js',
    sri: 'DGyLxAyjq0f9SPpVevD6IgztCFlnMF6oW/XQGmfe+IsZ8TqEiDrcHkMLKI6fiB/Z',
  },
  {
    pkg: 'react-dom', version: '18.3.1',
    entry: 'package/umd/react-dom.production.min.js',
    out: 'react-dom.production.min.js',
    sri: 'gTGxhz21lVGYNMcdJOyq01Edg0jhn/c22nsx0kyqP0TxaV5WVdsSH1fSDUf5YJj1',
  },
];

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (r) => {
      if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) {
        r.resume();
        resolve(get(new URL(r.headers.location, url).toString()));
        return;
      }
      if (r.statusCode !== 200) {
        r.resume();
        reject(new Error('HTTP ' + r.statusCode + ' for ' + url));
        return;
      }
      const chunks = [];
      r.on('data', (c) => chunks.push(c));
      r.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

// Minimal tar reader: 512-byte header blocks; name at 0 (100 bytes), size at
// 124 (12 bytes, octal). Package entries here are well under the 100-char name
// limit, so no ustar prefix handling is needed.
function extractFromTar(tar, entryName) {
  let off = 0;
  while (off + 512 <= tar.length) {
    const name = tar.toString('utf8', off, off + 100).replace(/\0.*$/, '');
    if (!name) break;
    const size = parseInt(tar.toString('utf8', off + 124, off + 136).replace(/\0.*$/, '').trim(), 8) || 0;
    const start = off + 512;
    if (name === entryName) return tar.subarray(start, start + size);
    off = start + Math.ceil(size / 512) * 512;
  }
  return null;
}

function sha384(buf) {
  return crypto.createHash('sha384').update(buf).digest('base64');
}

(async () => {
  fs.mkdirSync(VENDOR, { recursive: true });
  for (const w of WANT) {
    const dest = path.join(VENDOR, w.out);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 0 && sha384(fs.readFileSync(dest)) === w.sri) {
      continue;
    }
    process.stdout.write(`Vendoring ${w.pkg}@${w.version} …\n`);
    const tgz = await get(`https://registry.npmjs.org/${w.pkg}/-/${w.pkg}-${w.version}.tgz`);
    const file = extractFromTar(zlib.gunzipSync(tgz), w.entry);
    if (!file) throw new Error('entry not found in tarball: ' + w.entry);
    const got = sha384(file);
    if (got !== w.sri) throw new Error(`integrity mismatch for ${w.out}: expected ${w.sri}, got ${got}`);
    fs.writeFileSync(dest, file);
  }
  // Emit the loader the HTML includes before support.js. When vendor/ is built
  // this file exists and points the runtime at the local copies; when it is
  // absent (e.g. a static host that never ran this script) the <script> include
  // simply 404s and the runtime falls back to the public CDN.
  fs.writeFileSync(path.join(VENDOR, 'local-react.js'),
    'window.__resources = {\n' +
    '  "https://unpkg.com/react@18.3.1/umd/react.production.min.js": "./vendor/react.production.min.js",\n' +
    '  "https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js": "./vendor/react-dom.production.min.js"\n' +
    '};\n');
  console.log('vendor/ ready (React + ReactDOM 18.3.1, integrity-verified).');
})().catch((e) => {
  console.error('vendor-react failed:', e.message);
  console.error('The store falls back to the public CDN when vendor/ is absent.');
  process.exit(1);
});
