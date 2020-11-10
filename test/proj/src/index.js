export default [
  {
    patterns: ['/', '/home'],
    loader: () => import('./home/controller')
  },
  {
    patterns: ['/tst', '/test'],
    loader: () => import('./test/controller')
  }
]
