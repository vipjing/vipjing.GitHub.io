const { spawn } = require('child_process')

const { dest, series, src, watch } = require('gulp')
const log = require('fancy-log')
const less = require('gulp-less')
const LessAutoprefix = require('less-plugin-autoprefix')
const cleanCSS = require('gulp-clean-css')
const hugoBin = require('hugo-bin')
const BrowserSync = require('browser-sync')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')

const browserSync = BrowserSync.create()

const autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] })

function buildCss() {
  return src('./src/less/**/*.less')
    .pipe(less({ plugins: [autoprefix] }))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(dest('./dist/css'))
    .pipe(browserSync.stream())
}

function buildJsAndTpl(cb) {
  webpack(webpackConfig, (_, stats) => {
    log(
      'Webpack',
      stats.toString({
        colors: true,
      })
    )

    cb()
  })
}

const hugoArgsDefault = ['-d', './dist', '-s', '.', '-v']

function buildSite(cb, options = []) {
  const args = options ? hugoArgsDefault.concat(options) : hugoArgsDefault

  spawn(hugoBin, args, { stdio: 'inherit' }).on('close', () => {
    if (process.env.NODE_ENV === 'development') {
      browserSync.reload()
    }

    cb()
  })
}

exports.build = series(buildCss, buildJsAndTpl, buildSite)
exports.buildJsAndTpl = buildJsAndTpl
exports.server = () => {
  browserSync.init({
    host: '0.0.0.0',
    ui: {
      port: 4000,
    },
    port: 3005,
    server: {
      baseDir: './dist',
    },
    online: true,
  })

  watch('./src/js/**/*.js', buildJsAndTpl)
  watch('./src/less/**/*.less', buildCss)
  watch('./{data,content,layouts,static}/**/*', buildSite)
}
