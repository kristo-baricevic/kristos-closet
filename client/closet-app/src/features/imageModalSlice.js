import { createSlice } from '@reduxjs/toolkit';

const imageModalSlice = createSlice({
  name: 'imageModal',
  initialState: {
    imageModalVisibility: false,
    modalImage: null,
  },
  reducers: {
    openImageModal: (state) => {
      state.imageModalVisibility = true;
    },
    closeImageModal: (state) => {
      state.imageModalVisibility = false;
      state.modalImage = null; 
    },
    setModalImage: (state, action) => {
      state.modalImage = action.payload;
    },
  },
});

export const {
    closeImageModal,
    openImageModal,
    setModalImage,
  } = imageModalSlice.actions;

export const imageModalVisibility = (state) => state.imageModal.imageModalVisibility;
export const modalImage = (state) => state.imageModal.modalImage;
export const imageModalSliceReducer = imageModalSlice.reducer;
