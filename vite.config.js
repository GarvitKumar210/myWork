import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const backendRoot = path.resolve(__dirname, 'backend')

/** Serve /backend/*.json in dev and copy into dist on build */
function backendJsonApi() {
  return {
    name: 'backend-json-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url?.startsWith('/backend/')) return next()

        const rel = decodeURIComponent(req.url.split('?')[0].replace(/^\/backend\//, ''))
        const file = path.resolve(backendRoot, rel)

        if (!file.startsWith(backendRoot) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
          res.statusCode = 404
          res.end(JSON.stringify({ error: 'Not found' }))
          return
        }

        res.setHeader('Content-Type', 'application/json; charset=utf-8')
        res.setHeader('Cache-Control', 'no-cache')
        fs.createReadStream(file).pipe(res)
      })
    },
    closeBundle() {
      const distBackend = path.resolve(__dirname, 'dist/backend')
      fs.mkdirSync(distBackend, { recursive: true })
      fs.cpSync(backendRoot, distBackend, { recursive: true })
    },
  }
}

// GitHub Pages project site: https://GarvitKumar210.github.io/myWork/
export default defineConfig({
  base: '/myWork/',
  plugins: [react(), tailwindcss(), backendJsonApi()],
})
