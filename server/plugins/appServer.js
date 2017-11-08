module.exports = {
  name: 'AppServer',

  register: (server, options) => {
    server.dependency(['inert', 'Renderer'], registerRoutes)
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
        const html = await server.app.renderer.renderToString(context)
        return h.response(html).header('Content-Type', 'text/html')
      } catch (err) {
        throw err
      }
    }
  })
}
