import { ModelAction, Store } from '../types';
declare const createStore: <ModelState>(initialState: ModelState, actions: {
    [key: string]: ModelAction<ModelState>;
}) => Store<ModelState>;
export default createStore;
