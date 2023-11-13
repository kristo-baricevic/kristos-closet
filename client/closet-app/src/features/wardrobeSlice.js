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
    console.log("get wardrobe test", user._id);
    const response = await axios.get(`https://kristobaricevic.com/api/wardrobe/${user._id}`);
    console.log("response?", response);
    console.log("wardrobe data", response.data)
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

export const addToWardrobeAsync = createAsyncThunk('wardrobe/wardrobe', async (user, outfit) => {
  try {
    console.log("add to w user", user);
    console.log("add to w outfit", outfit);
    const response = await axios.post(`https://kristobaricevic.com/api/wardrobe/${user}`, outfit);
    console.log("wardrobe data", response);
    addToWardrobe(response);
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
