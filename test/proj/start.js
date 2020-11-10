const matcha = require('../../dist').default

matcha.start({
  port: 3004,
  env: 'fat',
  mode: 'development',
  root: __dirname,
  src: './src',
  publish: './publish',
  publicPath: '/app',
  bundleName: 'server.bundle.js',
  staticPath: '/static/',
})
