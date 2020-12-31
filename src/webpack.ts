
import { MatchaConfig } from './types'
import path from 'path'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import { WebpackManifestPlugin } from 'webpack-manifest-plugin'

export const createClientWebpackConfig = (matchaConfig: MatchaConfig, isDevServer = false): any => {
  const webpackConfig = {}
  const routes = path.resolve(matchaConfig.root, matchaConfig.src)
  const target = 'web'
  const mode = matchaConfig.mode
  const entry = path.resolve(__dirname, './client/start.js')

  const output = {
    libraryTarget: 'window',
    path: path.join(matchaConfig.root, matchaConfig.out, matchaConfig.staticPath),
    filename: 'js/index.js',
    chunkFilename: 'js/[name].[contenthash].js',
    publicPath: matchaConfig.staticPath
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
    new CleanWebpackPlugin(),
    new WebpackManifestPlugin({ useEntryKeys: true, publicPath: '' })
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
    devtool,
    watch: !!isDevServer
  })
  return webpackConfig
}

export const createServerWebpackConfig = (matchaConfig: MatchaConfig, isDevServer: boolean = false) => {
  const webpackConfig = {}
  const routes = path.resolve(matchaConfig.root, matchaConfig.src)
  const target = 'node'
  const mode = matchaConfig.mode
  const entry = routes
  const output = {
    path: path.join(matchaConfig.root, matchaConfig.out, 'routes'),
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
    new CleanWebpackPlugin(),
    new WebpackManifestPlugin({ useEntryKeys: true, publicPath: '' })
  ]

  const devServer = {
    stats: 'verbose'
  }

  const devtool = 'source-map'

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
    devtool,
    watch: !!isDevServer
  })
  return webpackConfig
}
