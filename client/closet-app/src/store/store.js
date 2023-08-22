import { configureStore } from '@reduxjs/toolkit';
import uploadSlice from '../features/uploadSlice';
import modalSlice from '../features/modalSlice';
import userSlice from '../features/userSlice';
import selectedItemsSlice from '../features/selectedItemsSlice';
import closetSlice from '../features/closetSlice';

const store = configureStore({
  reducer: {
    upload: uploadSlice.reducer,
    modal: modalSlice.reducer,
    user: userSlice.reducer,
    selectedItems: selectedItemsSlice.reducer,
    closet: closetSlice.reducer,
  },
  // Add middleware or other configurations if needed
});

export default store;
