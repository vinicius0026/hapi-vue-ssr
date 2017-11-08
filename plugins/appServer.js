const Fs = require('fs')
const LRU = require('lru-cache')
const Path = require('path')

const { createBundleRenderer } = require('vue-server-renderer')

const template = Fs.readFileSync(resolve('../assets/index.template.html'), 'utf-8')

const bundle = require('../public/vue-ssr-server-bundle.json')
const clientManifest = require('../public/vue-ssr-client-manifest.json')

let renderer = createRenderer(bundle, { clientManifest })

module.exports = {
  name: 'AppServer',

  register: (server, options) => {
    server.dependency('inert', registerRoutes)
  }
}

function registerRoutes (server) {
  server.route({
    method: 'GET',
    path: '/{p*}',
    handler: async (request, h) => {
      const { url } = request.raw.req

      const context = {
        url
      }

      try {
        const html = await renderer.renderToString(context)
        return h.response(html).header('Content-Type', 'text/html')
      } catch (err) {
        throw err
      }
    }
  })
}

function createRenderer (bundle, options) {
  return createBundleRenderer(bundle, {
    ...options,
    template,
    // for component caching
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    // this is only needed when vue-server-renderer is npm-linked
    basedir: resolve('../public'),
    // recommended for performance
    runInNewContext: false
  })
}

function resolve (file) {
  return Path.resolve(__dirname, file)
}
