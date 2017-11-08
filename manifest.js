const Path = require('path')

const isProd = process.env.NODE_ENV === 'prod'

const prodPlugins = ['inert', './appServer', './staticServer', './renderer']
const devPlugins = ['./devServer', './eventBus'].concat(prodPlugins)

module.exports = {
  server: {
    port: process.env.PORT || 8080,
    host: 'localhost',
    routes: {
      files: {
        relativeTo: Path.resolve(__dirname, '..')
      }
    }
  },
  register: {
    plugins: isProd ? prodPlugins : devPlugins
  }
}
