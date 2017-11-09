const Path = require('path')
const Webpack = require('webpack')
const VueConfig = require('./vue-loader.config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const resolve = file => Path.resolve(__dirname, file)

const prodPlugins = [
  new Webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
  }),
  new ExtractTextPlugin({
    filename: 'common.[chunkhash].css'
  })
]

const devPlugins = [
  new FriendlyErrorsPlugin()
]

module.exports = {
  devtool: isProd ? false : '#cheap-module-source-map',
  output: {
    path: resolve('../public'),
    publicPath: '/public/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['*', '.js', '.json', '.vue'],
    alias: {
      'app': resolve('../app'),
      'components': resolve('../app/components'),
      'examples': resolve('../app/pages/examples'),
      'layouts': resolve('../app/layouts'),
      'mixins': resolve('../app/mixins'),
      'pages': resolve('../app/pages'),
      'public': resolve('../public'),
      'router': resolve('../app/router'),
      'static': resolve('../static'),
      'store': resolve('../app/store'),
      'vue$': 'vue/dist/vue.common.js'
    }
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: VueConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.styl$/,
        loader: ['style-loader', 'css-loader', 'stylus-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  plugins: isProd
    ? prodPlugins
    : devPlugins
}
