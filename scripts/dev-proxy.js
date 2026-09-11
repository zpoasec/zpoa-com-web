// Single-command dev launcher for both site variants.
//
// Docusaurus's dev server compiles exactly one locale per process, so the US
// (default) and India (en-in) sites have to run as two separate
// `docusaurus start` processes on their own internal ports. This script
// spawns both of those itself and puts a small reverse proxy in front of
// them, so starting this one script is enough: a visitor only ever talks to
// http://localhost:3000/ for US content and http://localhost:3000/en-in/ for
// India content - one server, one port, switch by URL - matching how
// `docusaurus build` ships both locales under one deployed site.
const path = require('path');
const http = require('http');
const {spawn} = require('child_process');
const httpProxy = require('http-proxy');

const ROOT = path.join(__dirname, '..');
const DOCUSAURUS_CLI = path.join(ROOT, 'node_modules', '@docusaurus', 'core', 'bin', 'docusaurus.mjs');

const PORT = process.env.DEV_PROXY_PORT || 3000;
const US_PORT = 3001;
const IN_PORT = 3003;
const US_TARGET = `http://localhost:${US_PORT}`;
const IN_TARGET = `http://localhost:${IN_PORT}`;

const children = [];

function spawnSite(label, args, readyMarker, onReady) {
  const child = spawn(process.execPath, [DOCUSAURUS_CLI, 'start', ...args], {
    cwd: ROOT,
    shell: false,
  });
  children.push(child);

  let seenReady = false;
  const forward = (chunk) => {
    process.stdout.write(`[${label}] ${chunk}`);
    if (!seenReady && chunk.includes(readyMarker)) {
      seenReady = true;
      onReady();
    }
  };
  child.stdout.on('data', (d) => forward(d.toString()));
  child.stderr.on('data', (d) => process.stderr.write(`[${label}] ${d}`));
  child.on('exit', (code) => {
    console.log(`[${label}] exited with code ${code}`);
  });
  return child;
}

function startProxyOnce() {
  if (startProxyOnce._started) return;
  startProxyOnce._started = true;

  const proxy = httpProxy.createProxyServer({ws: true, xfwd: true});
  proxy.on('error', (err, _req, res) => {
    console.error('[dev-proxy] proxy error:', err.message);
    if (res && !res.headersSent && typeof res.writeHead === 'function') {
      res.writeHead(502, {'Content-Type': 'text/plain'});
      res.end('Bad gateway: a backend dev server is not ready yet, try again in a moment.');
    }
  });

  const targetFor = (url) => (url.startsWith('/en-in') ? IN_TARGET : US_TARGET);

  const server = http.createServer((req, res) => {
    proxy.web(req, res, {target: targetFor(req.url)});
  });

  // Webpack HMR websockets connect to a bare '/ws' path with no locale
  // prefix, so path alone can't route them. The client sets Referer to the
  // page that opened the socket, which does carry the locale prefix.
  server.on('upgrade', (req, socket, head) => {
    const referer = req.headers.referer || '';
    const target = referer.includes('/en-in') ? IN_TARGET : US_TARGET;
    proxy.ws(req, socket, head, {target});
  });

  server.listen(PORT, () => {
    console.log('');
    console.log(`[dev-proxy] Ready. Both sites are live on one server:`);
    console.log(`[dev-proxy]   United States -> http://localhost:${PORT}/`);
    console.log(`[dev-proxy]   India         -> http://localhost:${PORT}/en-in/`);
    console.log('');
  });
}

let readyCount = 0;
function markReady() {
  readyCount += 1;
  if (readyCount === 2) startProxyOnce();
}

spawnSite('us', ['--port', String(US_PORT)], '[SUCCESS]', markReady);
spawnSite('in', ['--locale', 'en-in', '--port', String(IN_PORT)], '[SUCCESS]', markReady);

function shutdown() {
  for (const child of children) {
    if (!child.killed) child.kill();
  }
  process.exit(0);
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
