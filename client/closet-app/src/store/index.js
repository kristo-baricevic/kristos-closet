// src/store/index.js
import { configureStore, combineReducers } from 'redux';
import Reducer from './reducer.js';

const rootReducer = combineReducers({
  yourReducer,
  // ...add more reducers if needed
});

const store = createStore(rootReducer);

export default store;