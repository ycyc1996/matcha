
import { AppConfig } from './types'
import path from 'path'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

export const createClientWebpackConfig = (appConfig: AppConfig): any => {
  const isProd = appConfig.mode === 'production'
  console.log(isProd)
  const webpackConfig = {}
  // const root = path.resolve(appConfig.root, appConfig.src)
  const routes = path.resolve(appConfig.root, appConfig.src)
  const target = 'web'
  const mode = appConfig.mode
  const entry = path.resolve(__dirname, './isomorphic/entry/client')

  console.log('entry', entry)

  console.log(path.join(appConfig.root, appConfig.publish, appConfig.out))

  const output = {
    libraryTarget: 'window',
    path: path.join(path.join(appConfig.root, appConfig.out), appConfig.staticPath),
    filename: 'js/index.js',
    chunkFilename: 'js/[name].[contenthash].js',
    publicPath: appConfig.staticPath
  }

  console.log(output.path)

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
        plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime']
      }
    }
  ]

  const resolve = {
    extensions: ['.js', '.jsx', '.json', '.mjs', '.ts', '.tsx'],
    alias: {
      '@routes': routes
    }
  }

  const module = { rules }

  const plugins = [
    new CleanWebpackPlugin()
  ]

  const devtool = 'source-map'

  const devServer = {
    stats: 'verbose'
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
    devtool
  })
  return webpackConfig
}

export const createServerWebpackConfig = (appConfig: AppConfig) => {
  const isProd = appConfig.mode === 'production'
  const webpackConfig = {}
  const routes = path.resolve(appConfig.root, appConfig.src)
  const target = 'node'
  const mode = appConfig.mode
  const entry = routes

  console.log('entry', entry)

  console.log(path.join(appConfig.root, appConfig.publish, appConfig.out))

  const output = {
    path: path.join(appConfig.root, appConfig.out),
    libraryTarget: 'commonjs2',
    filename: 'index.js',
    chunkFilename: '[name].[contenthash].js'
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
        plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime']
      }
    }
  ]

  const resolve = {
    extensions: ['.js', '.jsx', '.json', '.mjs', '.ts', '.tsx'],
    alias: {
      '@routes': routes
    }
  }

  const module = { rules }

  const plugins = [
    new CleanWebpackPlugin()
  ]

  const devServer = {
    stats: 'verbose'
  }

  const devtool = 'source-map'

  const watch = !isProd

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
    watch,
    devtool
  })
  return webpackConfig
}
