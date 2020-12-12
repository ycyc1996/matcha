import { AppConfig } from './types'
import webpack from 'webpack'
import { createServerWebpackConfig, createClientWebpackConfig } from './webpack'

const buildApp = async (appConfig: AppConfig) => {
  const clientWebpackConfig = createClientWebpackConfig(appConfig)
  webpack(clientWebpackConfig, async (err, stats: webpack.Stats) => {
    console.log(err)
    console.log(stats.toString({ colors: true }))
  })

  webpack(createServerWebpackConfig(appConfig), async (err, stats: webpack.Stats) => {
    console.log(err)
    console.log(stats.toString({ colors: true }))
  })
}

export default buildApp
