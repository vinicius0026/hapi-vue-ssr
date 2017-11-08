const createRenderer = require('../build/createRenderer')

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
