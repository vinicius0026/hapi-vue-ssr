const Fs = require('fs')
const Hapi = require('hapi')
const Inert = require('inert')
const LRU = require('lru-cache')
const Path = require('path')

const { createBundleRenderer } = require('vue-server-renderer')

const template = Fs.readFileSync('./assets/index.template.html', 'utf-8')

const bundle = require('./public/vue-ssr-server-bundle.json')
const clientManifest = require('./public/vue-ssr-client-manifest.json')

const renderer = createRenderer(bundle, { clientManifest })

const server = new Hapi.Server({
  port: process.env.PORT || 8080,
  routes: {
    files: {
      relativeTo: __dirname
    }
  }
})

provision()

async function provision () {
  await server.register(Inert)

  server.route({
    method: 'GET',
    path: '/public/{param*}',
    handler: {
      directory: {
        path: './public',
        redirectToSlash: true,
        index: true
      }
    }
  })

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

  await server.start()

  console.log('Server running at', server.info.uri)
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
    basedir: resolve('./public'),
    // recommended for performance
    runInNewContext: false
  })
}

function resolve (file) {
  return Path.resolve(__dirname, file)
}
