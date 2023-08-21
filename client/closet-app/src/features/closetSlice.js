import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  images: [],
  loading: false,
  error: null,
};

// Thunk action to fetch items
export const fetchItems = () => async (dispatch) => {
    dispatch(fetchItemsStart());
  
    try {
      const response = await axios.get('http://localhost:5000/api/images');
      const data = response.data;
  
      const updatedImages = data.map((image) => ({
        ...image,
        isUserImage: image.userId !== null,
        imageUrl: `http://localhost:5000/api/images/${image.id}`,
      }));
  
      dispatch(fetchItemsSuccess(updatedImages));
    } catch (error) {
      dispatch(fetchItemsFailure(error));
    }
  };

const initialClosetSlice = createSlice({
  name: 'initialCloset',
  initialState,
  reducers: {
    fetchItemsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchItemsSuccess: (state, action) => {
      state.images = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchItemsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    editImage: (state, action) => {
        const { id, category } = action.payload;
        const imageToEdit = state.images.find(image => image.id === id);
        if (imageToEdit) {
          imageToEdit.category = category;
        }
    },
    deleteImage: (state, action) => {
        const imageId = action.payload;
        state.images = state.images.filter(image => image.id !== imageId);
    },
  },
});

export const {
  fetchItemsStart,
  fetchItemsSuccess,
  fetchItemsFailure,
  editImage,
  deleteImage,
} = initialClosetSlice.actions;

export const selectInitialClosetItems = (state) => state.initialCloset.images;
export const selectInitialClosetLoading = (state) => state.initialCloset.loading;
export const selectInitialClosetError = (state) => state.initialCloset.error;

export default initialClosetSlice.reducer;
