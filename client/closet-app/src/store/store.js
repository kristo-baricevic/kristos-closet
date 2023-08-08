// store.js
import rootReducer from '../index';
import { configureStore } from '@reduxjs/toolkit';


const store = configureStore(rootReducer);

export default store;
