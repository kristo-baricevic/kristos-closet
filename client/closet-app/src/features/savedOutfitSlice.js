import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



const initialState = {
  outfits: [
    {
      name: 'Outfit1',
      description: 'My first outfit',
      user: null,
      clothingItems: [], 
      imageUrl: 'URL to image',
    },
  ],
  loading: false,
  error: null,
};

// Define an async thunk for saving an outfit
export const saveOutfitAsync = createAsyncThunk('savedOutfit/saveOutfit', 
async (outfitData) => {
  console.log("outfit data async", outfitData);
  try {
    // Make an API request to save the outfit data
    const response = await axios.post(
      'https://kristobaricevic.com/api/outfit', 
      outfitData
    );
    console.log("outfit data posted", response);

    // Return the saved outfit data in the response
    return response.data;
  } catch (error) {
    // Handle errors and reject the promise with the error message
    throw error;
  }
});


export const savedOutfitSlice = createSlice({
  name: 'savedOutfit',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveOutfitAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveOutfitAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.outfits.push(action.payload);
      })
      .addCase(saveOutfitAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectedOutfits = (state) => state.savedOutfit.outfits;
export const selectedOutfitLoading = (state) => state.savedOutfit.loading;
export const selectedOutfitError = (state) => state.savedOutfit.error;

export const { saveOutfit, deleteOutfit } = savedOutfitSlice.actions;
export const savedOutfitSliceReducer = savedOutfitSlice.reducer;

export default saveOutfitAsync; 
