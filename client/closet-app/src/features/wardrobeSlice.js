import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { selectUser } from './userSlice';
import axios from 'axios';



const initialState = {
  wardrobe: [],
  loading: false,
  error: null,
};

export const getWardrobe = createAsyncThunk('wardrobe/wardrobe', async (user) => {
  try {
    const response = await axios.get(`https://kristobaricevic.com/api/wardrobe/${user}`);
    console.log("response is", response);
    const wardrobeData = response.data;
    console.log("wardrobe data", wardrobeData)
    return wardrobeData;
  } catch (error) {
    console.error(error);
  }
});



export const wardrobeSlice = createSlice({
  name: 'wardrobe',
  initialState,
  reducers: {
    addToWardrobe: (state, action) => {
      const outfit = action.payload; 
      console.log("outfit in slice", outfit);
      state.wardrobe.push(outfit);
    },
    removeFromWardrobe: (state, action) => {
      const outfitIdToRemove = action.payload;

      // Filter out the outfit to remove from the state
      state.wardrobe = state.wardrobe.filter((outfit) => outfit._id !== outfitIdToRemove);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWardrobe.fulfilled, (state, action) => {
        // This is where you update the state with the wardrobe data from the async request
        state.wardrobe = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getWardrobe.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWardrobe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectedWardrobe = (state) => state.wardrobe.wardrobe;
export const wardrobeLoading = (state) => state.wardrobe.loading;
export const wardrobeError = (state) => state.wardrobe.error;

export const { addToWardrobe, removeFromWardrobe, get } = wardrobeSlice.actions;
export const wardrobeSliceReducer = wardrobeSlice.reducer;
