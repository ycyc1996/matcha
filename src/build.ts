import { MatchaConfig } from './types'
import webpack from 'webpack'
import { createServerWebpackConfig, createClientWebpackConfig } from './webpack'

const buildApp = async (matchaConfig: MatchaConfig) => {
  const buildAppConfig = { ...matchaConfig }
  webpack(createClientWebpackConfig(buildAppConfig, false), async (err: Error, stats: webpack.Stats) => {
    console.log(err)
    console.log(stats.toString({ colors: true }))
  })

  webpack(createServerWebpackConfig(buildAppConfig, false), async (err: Error, stats: webpack.Stats) => {
    console.log(err)
    console.log(stats.toString({ colors: true }))
  })
}

export default buildApp
