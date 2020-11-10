const matcha = require('../../dist/src').default

matcha.start({
  port: 3004,
  env: 'fat',
  mode: 'development',
  root: __dirname,
  src: './src',
  out: './out',
  publish: './publish',
  publicPath: '/app',
  bundleName: 'server.bundle.js',
  staticPath: '/static/',
})
