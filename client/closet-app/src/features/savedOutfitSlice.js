import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  name: 'New Outfit',
  userId: null,
  outfit: [
    { Accessory: null },
    { Bottom: null },
    { Hat: null },
    { Shoes: null },
    { Top: null },
    { onePiece: null } 
  ],
  loading: false,
  error: null,
};

export const handleSetOutfit = (outfitHandler) => async (dispatch) => {
  console.log("handle selected Items", outfitHandler);
  dispatch(saveOutfitSuccess(outfitHandler));
};

export const saveOutfitAsync = createAsyncThunk(
  'savedOutfit/saveOutfit', 
  async (outfitData) => {
  

    console.log("outfitData test", outfitData);

    try {
      const outfitToSave = {
        name: outfitData.name,
        userId : outfitData.user,
        clothingItems: [
          outfitData.clothingItems.Accessory?.id, 
          outfitData.clothingItems.Top?.id, 
          outfitData.clothingItems.Bottom?.id, 
          outfitData.clothingItems.Hat?.id, 
          outfitData.clothingItems.Shoes?.id, 
          outfitData.clothingItems.onePiece?.id, 
        ]
      };

      const response = await axios.post(
        'https://kristobaricevic.com/api/outfit',
        outfitToSave
      );
    
      // Return the response data
      return response.data;
    } catch (error) {
      console.error("Error saving outfit in savedOutfitSlice:", error);
      throw error;
    }
  }
);

export const savedOutfitSlice = createSlice({
  name: 'savedOutfit',
  initialState,
  reducers: {
    saveOutfitSuccess: (state, action) => {
      state.outfit = action.payload;
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

export const { saveOutfitSuccess, saveOutfitFailure } = savedOutfitSlice.actions;

export const savedOutfitSliceReducer = savedOutfitSlice.reducer;

export default saveOutfitAsync; 
