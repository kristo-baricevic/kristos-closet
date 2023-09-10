import { configureStore } from '@reduxjs/toolkit';
import { uploadSliceReducer } from '../features/uploadSlice';
import { modalSliceReducer } from '../features/modalSlice';
import { userSliceReducer } from '../features/userSlice';
import { selectedItemsSliceReducer } from '../features/selectedItemsSlice';
import { closetSliceReducer } from '../features/closetSlice';
import { imageModalSliceReducer } from '../features/imageModalSlice';
import thunkMiddleware from 'redux-thunk';
import { previewModalReducer } from '../features/previewModalSlice.js';
import { editModalSliceReducer } from '../features/editModalSlice';


const middleware = [thunkMiddleware];

const store = configureStore({
  reducer: {
    upload: uploadSliceReducer,
    modal: modalSliceReducer,
    user: userSliceReducer,
    selectedItems: selectedItemsSliceReducer,
    closet: closetSliceReducer,
    editModal: editModalSliceReducer,
    imageModal: imageModalSliceReducer,
    previewModal: previewModalReducer,
  },
  middleware: middleware,
  devTools: process.env.NODE_ENV !== 'production',
})

export default store;
