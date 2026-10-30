import http from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// A real static server under a repository subpath, so tests catch Pages path bugs.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist')
const prefix = '/Personal_webpage/'
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.mp4': 'video/mp4', '.woff2': 'font/woff2', '.md': 'text/plain' }
http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname)
    if (!pathname.startsWith(prefix)) { response.writeHead(404).end(); return }
    const relative = pathname.slice(prefix.length) || 'index.html'
    const target = path.resolve(root, relative)
    if (!target.startsWith(root + path.sep)) { response.writeHead(403).end(); return }
    const file = await readFile(target)
    const info = await stat(target)
    const range = request.headers.range?.match(/^bytes=(\d+)-(\d*)$/)
    const headers = { 'Content-Type': mime[path.extname(target)] || 'application/octet-stream', 'Accept-Ranges': 'bytes' }
    if (range) {
      const start = Number(range[1]), end = Math.min(Number(range[2] || info.size - 1), info.size - 1)
      if (start > end) { response.writeHead(416).end(); return }
      response.writeHead(206, { ...headers, 'Content-Range': `bytes ${start}-${end}/${info.size}`, 'Content-Length': end - start + 1 }).end(file.subarray(start, end + 1))
    } else response.writeHead(200, { ...headers, 'Content-Length': info.size }).end(file)
  } catch { response.writeHead(404).end('Not found') }
}).listen(4173, '127.0.0.1', () => console.log('Static preview: http://127.0.0.1:4173/Personal_webpage/'))
