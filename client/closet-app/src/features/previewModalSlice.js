import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  previewModalVisibility: false,
  uploadPreview: null,
};

const previewModalSlice = createSlice({
  name: 'previewModal',
  initialState,
  reducers: {
    setPreviewModalVisibility: (state, action) => {
      state.previewModalVisibility = action.payload;
    },
    setPreviewImage: (state, action) => {
      state.uploadPreview = action.payload;
    },
    closePreviewModal: (state, action) => {
      console.log(state.uploadPreview);
      state.previewModalVisibility = action.payload;
      state.uploadPreview = null; 
    },
  },
});

export const {
    closePreviewModal,
    setPreviewModalVisibility,
    setPreviewImage,
  } = previewModalSlice.actions;

export const uploadPreviewVisibility = (state) => state.previewModal.previewModalVisibility;
export const previewModalImage = (state) => state.previewModal.uploadPreview;

export const previewModalReducer = previewModalSlice.reducer;
