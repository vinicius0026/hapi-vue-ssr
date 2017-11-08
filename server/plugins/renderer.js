const createRenderer = require('../../build/createRenderer')
const isProd = process.env.NODE_ENV === 'prod'

module.exports = {
  name: 'Renderer',

  register: (server, options) => {
    if (isProd) {
      const bundle = require('../../public/vue-ssr-server-bundle.json')
      const clientManifest = require('../../public/vue-ssr-client-manifest.json')

      server.app.renderer = createRenderer(bundle, { clientManifest })
      return
    }

    server.dependency('EventBus', registerListener)
  }
}

async function registerListener (server) {
  const { eventBus } = server.app
  let resolver
  let isResolved = false
  let bundle
  let clientManifest
  const resolvePromise = new Promise((resolve, reject) => { resolver = resolve })

  const updateRenderer = (bundle, clientManifest) => {
    if (bundle && clientManifest) {
      server.app.renderer = createRenderer(bundle, { clientManifest })

      if (!isResolved) {
        isResolved = true
        resolver()
      }
    }
  }

  eventBus.on('clientManifest', _clientManifest => {
    clientManifest = _clientManifest
    updateRenderer(bundle, clientManifest)
  })

  eventBus.on('bundle', _bundle => {
    bundle = _bundle
    updateRenderer(bundle, clientManifest)
  })

  await resolvePromise
}
