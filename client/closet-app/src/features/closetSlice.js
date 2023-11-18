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

  console.log("running fetchItems");

  try {
    console.log("inside the try");
    const response = await axios.get(`https://kristobaricevic.com/api/images`);
    console.log("fetchItems axios response", response);
    const data = response.data;

    const updatedImages = data.map((image) => ({
      ...image,
      isUserImage: image.userId !== null,
      imageUrl: `https://kristobaricevic.com/api/images/${image.id}`,
    }));

    dispatch(fetchItemsSuccess(updatedImages));
  } catch (error) {
    dispatch(fetchItemsFailure(error));
    console.log("there is an error!!!", error);
    throw(error);
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
    throw(error);
  }
};

// Thunk action to delete items
export const editCategory = (imageId, category) => async (dispatch) => {
  console.log("edit Items before try");
  dispatch(editImageStart());
  console.log("category", category);
  dispatch(editImage(imageId, category));
  console.log("new category", category);
  try {
    const response = await axios.put(`https://kristobaricevic.com/api/images/${imageId}`, {category});

    console.log(response);
    console.log("delete items slice with ", imageId);

    dispatch(editItemsSuccess());
  } catch (error) {
    dispatch(editItemsFailure(error));
    throw(error);
  }
};

export const toggleTabState = () => async (dispatch) => {
  console.log("toggle tab style");
  dispatch(toggleTabState());
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
    editImageStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    editItemsSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    editItemsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteImage: (state, action) => {
        const imageId = action.payload;
        state.images = state.images.filter(image => image.id !== imageId);
    },
    deleteItemsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteItemsSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    deleteItemsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    toggleTabStyle: (state, action) => {
        console.log("hello there");
        console.log(state.tabOpen);
        state.tabOpen = !state.tabOpen;
    }
  },
});

export const {
  toggleTabStyle,
  fetchItemsStart,
  fetchItemsSuccess,
  fetchItemsFailure,
  editImageStart,
  editItemsFailure,
  editItemsSuccess,
  deleteItemsStart,
  deleteItemsSuccess,
  deleteItemsFailure,
  editImage,
  deleteImage,
} = closetSlice.actions;

export const closetItems = (state) => state.closet.images;
export const closetLoading = (state) => state.closet.loading;
export const closetError = (state) => state.closet.error;
export const tabStyle = (state) => state.closet.tabOpen;

export const closetSliceReducer = closetSlice.reducer;
