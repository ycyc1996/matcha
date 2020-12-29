import { MatchaConfig } from './types'
import webpack from 'webpack'
import { createServerWebpackConfig, createClientWebpackConfig } from './webpack'
import path from 'path'

const buildApp = async (matchaConfig: MatchaConfig) => {
  const isDev = matchaConfig.mode === 'development'
  const buildAppConfig = {
    ...matchaConfig,
    out: isDev ? matchaConfig.out : path.join(matchaConfig.publish, matchaConfig.out)
  }
  webpack(createClientWebpackConfig(buildAppConfig), async (err, stats: webpack.Stats) => {
    console.log(err)
    console.log(stats.toString({ colors: true }))
  })

  webpack(createServerWebpackConfig(buildAppConfig), async (err, stats: webpack.Stats) => {
    console.log(err)
    console.log(stats.toString({ colors: true }))
  })
}

export default buildApp
