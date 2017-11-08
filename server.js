const Hapi = require('hapi')
const Inert = require('inert')

const AppServer = require('./plugins/appServer')
const DevServer = require('./plugins/devServer')
const StaticServer = require('./plugins/staticServer')
const Renderer = require('./plugins/renderer')
const EventBus = require('./plugins/eventBus')

const isProd = process.env.NODE_ENV === 'prod'

const server = new Hapi.Server({
  port: process.env.PORT || 8080,
  host: 'localhost',
  routes: {
    files: {
      relativeTo: __dirname
    }
  }
})

provision()

async function provision () {
  const prodPlugins = [Inert, AppServer, StaticServer, Renderer]
  const devPlugins = [DevServer, EventBus]

  const plugins = isProd ? prodPlugins : devPlugins.concat(prodPlugins)

  await server.register(plugins)

  await server.start()

  console.log(
    `${new Date()} - Server running at ${server.info.uri} in ${process.env.NODE_ENV} env`
  )
}
