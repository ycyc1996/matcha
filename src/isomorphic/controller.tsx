export default class AppController {
  ssr = false
  view = () => null
  model = {}
  constructor (context) {
    console.log('constructor')
  }
}
