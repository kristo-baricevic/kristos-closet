import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
      name: 'New Outfit',
      description: 'My outfit is cool',
      user: null,
      outfit: [ {items: {
        Top: null,
        Bottom: null,
        Shoes: null,
        Hat: null,
        onePiece: null,
        Accessory: null,
      },
    },
  ], 
  loading: false,
  error: null,
};

export const saveOutfitAsync = createAsyncThunk('savedOutfit/saveOutfit', async (outfitData, { dispatch }) => {

  console.log("outfit to save", outfitData);

  try {
    const response = await axios.post(
      'https://kristobaricevic.com/api/outfit',
      outfitData
    );
  
    console.log("the response is", response);

    // Dispatch an action indicating a successful outfit save
    dispatch(savedOutfitSlice.actions.saveOutfitSuccess(response.data));

    // Return the response data
    return response.data;
  } catch (error) {
    dispatch(savedOutfitSlice.actions.saveOutfitFailure(error));
    throw error;
  }
});

export const savedOutfitSlice = createSlice({
  name: 'savedOutfit',
  initialState,
  reducers: {
    saveOutfitSuccess: (state, action) => {
      state.outfit.push(action.payload);
    },
    saveOutfitFailure: (state, action) => {
      state.error = action.payload;
    },
  },
    extraReducers: (builder) => {
      builder
        .addCase(saveOutfitAsync.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(saveOutfitAsync.fulfilled, (state, action) => {
          state.loading = false;
        })
        .addCase(saveOutfitAsync.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
      }
    },
);

export const selectedOutfit = (state) => state.savedOutfit.outfit;
export const selectedOutfitLoading = (state) => state.savedOutfit.loading;
export const selectedOutfitError = (state) => state.savedOutfit.error;

export const savedOutfitSliceReducer = savedOutfitSlice.reducer;

export default saveOutfitAsync; 
