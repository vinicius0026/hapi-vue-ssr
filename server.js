const Hapi = require('hapi')
const Inert = require('inert')

const AppServer = require('./plugins/appServer')

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
  await server.register([Inert, AppServer])

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

  await server.start()

  console.log('Server running at', server.info.uri)
}
