import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from './reducers';
import thunkMiddleware from 'redux-thunk';
import selectedItemsReducer from '../features/selectedItemsSlice'; 

const store = configureStore({
  reducer: 
})


export default store;
