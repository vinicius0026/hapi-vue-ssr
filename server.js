const Glue = require('glue')

const manifest = require('./manifest')
const composeOptions = require('./composeOptions')

const startServer = async function () {
  try {
    const server = await Glue.compose(manifest, composeOptions)
    await server.start()
    console.log(
      `${new Date()} - Server running at ${server.info.uri} in ${process.env.NODE_ENV} env`
    )
  } catch (err) {
    console.error(err, err.stack)
    process.exit(1)
  }
}

startServer()
