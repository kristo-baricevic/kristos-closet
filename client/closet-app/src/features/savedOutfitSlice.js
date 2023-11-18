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
      }}],
  loading: false,
  error: null,
};

export const saveOutfitAsync = createAsyncThunk(
  'savedOutfit/saveOutfit', 
  async (outfitData) => {

  const clothingItemsForNewOutfit = [];

  for (const category in outfitData.clothingItems) {
    if (outfitData.clothingItems.hasOwnProperty(category)) {
      clothingItemsForNewOutfit.push({
        category,
        item: outfitData.clothingItems[category],
      });
    }
  }

  if (!outfitData || outfitData === null ) {
    console.log("there is no outfit!");
  } else {
    try {

      const outfitToSave = {
        name: outfitData.name,
        description: outfitData.description,
        user: outfitData.user,
        clothingItems: clothingItemsForNewOutfit,
        imageUrl: outfitData.imageUrl,
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
  };
});

export const savedOutfitSlice = createSlice({
  name: 'savedOutfit',
  initialState,
  reducers: {
    saveOutfitSuccess: (state, action) => {
      state.outfit = [...state.outfit, action.payload];
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
