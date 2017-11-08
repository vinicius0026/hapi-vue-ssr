const Hapi = require('hapi')
const Inert = require('inert')

const AppServer = require('./plugins/appServer')
const StaticServer = require('./plugins/staticServer')

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
  await server.register([Inert, AppServer, StaticServer])

  await server.start()

  console.log('Server running at', server.info.uri)
}
