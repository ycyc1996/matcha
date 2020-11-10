

import { AppConfig  } from './types'
import path from 'path'

const NODE_ENV = process.env.NODE_ENV || 'development'

export const createClientWebpackConfig = (appConfig: AppConfig): any => {
  const webpackConfig = {}
  const root = path.resolve(appConfig.root, appConfig.src)
  const routes = path.resolve(appConfig.root, appConfig.src)
  const target = 'web'
  const mode = NODE_ENV
  const entry = path.resolve(__dirname, '../../entry/client')

  console.log('entry', entry)

  console.log('out', path.join(appConfig.root, appConfig.staticPath))
  const output = {
    libraryTarget: 'window',
    path: path.join(appConfig.root, appConfig.staticPath),
    filename: 'js/main.js',
    chunkFilename: `js/[name].js`,
    publicPath: '/assets/'
  }

  const rules = [
    { parser: { requireEnsure: false } },
    {
      test: /\.(js|mjs|jsx|ts|tsx)$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
          [
            '@babel/preset-typescript',
            { isTSX: true, allExtensions: true }
          ]
        ],
        plugins: ['@babel/plugin-proposal-class-properties', "@babel/plugin-transform-runtime"]
      },
    }
  ]

  const resolve = {
    extensions: ['.js', '.jsx', '.json', '.mjs', '.ts', '.tsx'],
    alias: {
      '@routes': routes
    }
  }

  const module = { rules }

  const plugins =  []

  const devServer =  {
    stats: "verbose"
  }


  const optimization = {
    // Automatically split vendor and commons
    // https://twitter.com/wSokra/status/969633336732905474
    // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
    splitChunks: {
      chunks: 'all',
      name: 'vendor'
    },
    minimize: true
  }
  Object.assign(webpackConfig, {
    target,
    mode,
    entry,
    output,
    module,
    resolve,
    plugins,
    devServer,
    optimization,
  })
  return webpackConfig
}


export const createServerWebpackConfig = (appConfig: AppConfig) => {
  const webpackConfig = {}
  const root = path.resolve(appConfig.root, appConfig.src)
  const routes = path.resolve(appConfig.root, appConfig.src)
  const target = 'node'
  const mode = NODE_ENV
  const entry = routes

  console.log('entry', entry)

  const output = {
    path: path.join(appConfig.root, appConfig.out),
    libraryTarget: 'commonjs2',
    filename: 'main.js',
    chunkFilename: `[name].js`
  }
  const rules = [
    { parser: { requireEnsure: false } },
    {
      test: /\.(js|mjs|jsx|ts|tsx)$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
          [
            '@babel/preset-typescript',
            { isTSX: true, allExtensions: true }
          ]
        ],
        plugins: ['@babel/plugin-proposal-class-properties', "@babel/plugin-transform-runtime"]
      },
    }
  ]

  const resolve = {
    extensions: ['.js', '.jsx', '.json', '.mjs', '.ts', '.tsx'],
    alias: {
      '@routes': routes
    }
  }

  const module = { rules }

  const plugins = []

  const devServer =  {
    stats: "verbose"
  }

  const watch = true

  const optimization = {
    // Automatically split vendor and commons
    // https://twitter.com/wSokra/status/969633336732905474
    // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
    splitChunks: {
      chunks: 'all',
      name: 'vendor'
    },
    minimize: true
  }
  Object.assign(webpackConfig, {
    target,
    mode,
    entry,
    output,
    module,
    resolve,
    plugins,
    devServer,
    optimization,
    watch
  })
  return webpackConfig
}
