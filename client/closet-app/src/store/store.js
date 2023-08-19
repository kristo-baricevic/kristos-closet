import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import thunkMiddleware from 'redux-thunk';
import selectedItemsReducer from '../features/selectedItemsSlice'; 

const middleware = [...getDefaultMiddleware(), thunkMiddleware];

const rootReducerCombined = combineReducers({
  selectedItems: selectedItemsReducer,
  reducer: rootReducer,
})

const store = configureStore({
  reducer: rootReducerCombined,
  middleware: middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
