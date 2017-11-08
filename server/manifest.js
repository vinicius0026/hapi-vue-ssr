const Path = require('path')

const Config = require('./config')

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
    plugins: Config.get('/plugins')
  }
}
