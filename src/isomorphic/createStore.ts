import { ModelAction, Store, Work } from '../types'

const createStore = <ModelState>(
  initialState: ModelState,
  actions: {
    [key: string]: ModelAction<ModelState>
  }
): Store<ModelState> => {
  let state: ModelState = { ...initialState }

  let callbackWorkQueue: Work[] = []

  const dispatchers = {}

  Object.keys(actions).forEach(actionName => {
    dispatchers[actionName] = (...args: any[]) => replaceState(actions[actionName](getState(), ...args))
  })

  const getState = () => state

  const getDispatchers = () => dispatchers

  const replaceState = (nextState) => {
    state = { ...nextState }
    performCallbacks()
  }

  const performCallbacks = () => {
    const queue: Work[] = [...callbackWorkQueue]
    queue.forEach(work => {
      work.callback()
    })
  }

  const unsubscribe = (targetWork: Work) => {
    callbackWorkQueue = callbackWorkQueue.filter(work => work !== targetWork)
  }

  const subscribe = (callback: Function) => {
    const work: Work = {
      callback,
      createTime: Number(new Date())
    }
    callbackWorkQueue.push(work)
    return () => unsubscribe(work)
  }

  return {
    getState,
    replaceState,
    subscribe,
    getDispatchers
  }
}

export default createStore
