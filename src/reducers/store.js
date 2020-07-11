import { createStore } from 'redux';
import combineReducers from './index';


const store = createStore(combineReducers);
console.log('Initial State', store.getState());
store.subscribe(() => console.log('Update state', store.getState()));

export default store;

