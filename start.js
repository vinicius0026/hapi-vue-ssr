const Server = require('./server')
const manifest = require('./server/manifest')
const composeOptions = require('./server/composeOptions')
const pkg = require('./package.json')

Server.init(manifest, composeOptions)
  .then(server => {
    console.log(`${new Date()} - Server version: ${pkg.version} running at: ${server.info.uri} in ${process.env.NODE_ENV} mode`)
  })
  .catch(err => {
    console.error('err', err)
    process.exit(1)
  })
