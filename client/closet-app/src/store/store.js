import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { uploadSliceReducer } from '../features/uploadSlice';
import { modalSliceReducer } from '../features/modalSlice';
import { userSliceReducer } from '../features/userSlice';
import { selectedItemsSliceReducer } from '../features/selectedItemsSlice';
import { closetSliceReducer } from '../features/closetSlice';
import thunkMiddleware from 'redux-thunk';

const middleware = [...getDefaultMiddleware(), thunkMiddleware];

const store = configureStore({
  reducer: {
    upload: uploadSliceReducer,
    modal: modalSliceReducer,
    user: userSliceReducer,
    selectedItems: selectedItemsSliceReducer,
    closet: closetSliceReducer,
  },
  middleware: middleware,
  devTools: process.env.NODE_ENV !== 'production',
})

export default store;
