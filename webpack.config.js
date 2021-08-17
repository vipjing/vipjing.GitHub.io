const glob = require('glob')
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const pathJoinSrcJs = name => path.join(__dirname, 'src', 'js', name)

const generateEntry = () => {
  const filenames = glob.sync('src/js/*.js').map(path =>
    path
      .split('/')
      .pop()
      .replace(/.js$/i, '')
  )

  return filenames.reduce(
    (acc, filename) => ({
      ...acc,
      [filename]: pathJoinSrcJs(filename),
    }),
    {}
  )
}

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: generateEntry(),
  output: {
    path: path.join(__dirname, 'dist', 'js'),
    publicPath: '/js/',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, 'layouts', '_default', 'baseof.html'),
      template: path.join(__dirname, 'layouts', '_default', 'baseof.tpl.html'),
      chunks: ['app'],
    }),
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
}
