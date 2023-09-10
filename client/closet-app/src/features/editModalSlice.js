import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  editVisibility: false,
  editImage: null,
  uniqueCategories: null,
};

// Thunk action to delete items
export const editCategory = createAsyncThunk(
    'editModal/editCategory',
    async ({ imageId, category }) => {

    console.log("edit Items before try");
    editImageStart();
    console.log("category", category);
    updateImageCategory(imageId, category);
    console.log("new category", category);

    try {
      const response = await axios.put(`https://kristobaricevic.com/api/images/${imageId}`, {category});
  
      console.log(response);
  
      editItemsSuccess();
    } catch (error) {
      editItemsFailure(error);
    }
  });

export const editModalSlice = createSlice({
  name: 'editModal',
  initialState,
  reducers: {
    setEditModalVisibility: (state, action) => {
        console.log("set visibility running");
        state.editVisibility = action.payload;
    },
    setEditImage: (state, action) => {
        state.editImage = action.payload;
    },
    setCategory: (state, action) => {
        state.editImage.category = action.payload;
    },
    closeEditModal: (state, action) => {
        state.editVisibility = action.payload;
    },
    setUniqueCategories: (state, action) => {
        state.uniqueCategories = action.payload;
    },
    updateImageCategory: (state, action) => {
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
  },
});

export const {
    closeEditModal,    
    setEditModalVisibility,
    setUniqueCategories,
    setEditImage,
    updateImageCategory,
    editImageStart,
    editItemsFailure,
    editItemsSuccess,
    setCategory,
} = editModalSlice.actions;

export const editModalVisibility = (state) => state.editModal.editVisibility;
export const editingImage = (state) => state.editModal.editImage;
export const categories = (state) => state.editModal.uniqueCategories;

export const editModalSliceReducer = editModalSlice.reducer;
