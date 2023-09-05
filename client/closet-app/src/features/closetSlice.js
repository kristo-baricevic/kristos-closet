import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  images: [],
  tabOpen: false,
  loading: false,
  error: null,
};

// Thunk action to fetch items
export const fetchItems = () => async (dispatch) => {
    dispatch(fetchItemsStart());
    console.log("inside fetch images", fetchItemsStart);
    try {
      const response = await axios.get(`https://kristobaricevic.com/api/images`);
      const data = response.data;
      const updatedImages = data.map((image) => ({
        ...image,
        isUserImage: image.userId !== null,
        imageUrl: `https://kristobaricevic.com/api/images/${image.id}`,
      }));
  
      dispatch(fetchItemsSuccess(updatedImages));
    } catch (error) {
      dispatch(fetchItemsFailure(error));
    }
  };

// Thunk action to delete items
export const deleteItems = (imageId) => async (dispatch) => {
  dispatch(deleteItemsStart());
  console.log("delete Items before try");
  try {
    const response = await axios.delete(`https://kristobaricevic.com/api/images/${imageId}`, imageId);

    console.log(response);
    console.log("delete items slice with ", imageId);
    dispatch(deleteItemsSuccess(imageId));
  } catch (error) {
    dispatch(deleteItemsFailure(error));
  }
};

export const toggleTabState = () => async (dispatch) => {
  console.log("toggle tab style");
  dispatch(toggleTabState(tabStyle));
  }


const closetSlice = createSlice({
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
    deleteItemsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteItemsSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    deleteItemsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    toggleTabStyle: (state, action) => {
        console.log("hello there");
        console.log(state.tabStyle);
        state.tabStyle = !state.tabStyle;
    }
  },
});

export const {
  toggleTabStyle,
  fetchItemsStart,
  fetchItemsSuccess,
  fetchItemsFailure,
  deleteItemsStart,
  deleteItemsSuccess,
  deleteItemsFailure,
  editImage,
  deleteImage,
} = closetSlice.actions;

export const selectInitialClosetItems = (state) => state.closet.images;
export const selectInitialClosetLoading = (state) => state.closet.loading;
export const selectInitialClosetError = (state) => state.closet.error;
export const tabStyle = (state) => state.closet.tabOpen;

export const closetSliceReducer = closetSlice.reducer;
