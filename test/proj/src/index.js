export default [
  {
    patterns: ['/', '/home'],
    loader: () => import(/* webpackChunkName: 'home' */'./home/controller')
  },
  {
    patterns: ['/tst', '/test'],
    loader: () => import(/* webpackChunkName: 'test' */'./test/controller')
  }
]
