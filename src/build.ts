import { AppConfig } from './types'
import webpack from 'webpack'
import { createServerWebpackConfig, createClientWebpackConfig } from './webpack'
import path from 'path'

const buildApp = async (appConfig: AppConfig) => {
  const buildAppConfig = {
    ...appConfig,
    out: path.join(appConfig.publish, appConfig.out)
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
