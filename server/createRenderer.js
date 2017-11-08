const Fs = require('fs')
const LRU = require('lru-cache')
const Path = require('path')
const { createBundleRenderer } = require('vue-server-renderer')

const template = Fs.readFileSync(resolve('../app/index.template.html'), 'utf-8')

module.exports = function (bundle, options) {
  return createBundleRenderer(bundle, {
    ...options,
    template,
    // for component caching
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    // this is only needed when vue-server-renderer is npm-linked
    basedir: resolve('../public'),
    // recommended for performance
    runInNewContext: false
  })
}

function resolve (file) {
  return Path.resolve(__dirname, file)
}
