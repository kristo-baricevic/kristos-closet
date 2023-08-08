// src/store/index.js
import { configureStore, combineReducers } from 'redux';
import Reducer from './reducer.js';

const rootReducer = combineReducers({
  Reducer,
  // ...add more reducers if needed
});

const store = configureStore(rootReducer);

export default store;