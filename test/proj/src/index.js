export default [
  {
    pattern: ['/', '/home'],
    loader: () => import('./home/controller')
  }
]
