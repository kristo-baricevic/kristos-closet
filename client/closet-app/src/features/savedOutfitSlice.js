import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { addToWardrobe } from './wardrobeSlice';

const initialState = {
  outfits: [
    {
      name: 'Outfit1',
      description: 'My first outfit',
      user: null,
      clothingItems: [ {items: {
        Top: null,
        Bottom: null,
        Shoes: null,
        Hat: null,
        onePiece: null,
        Accessory: null,
    }}], 
      imageUrl: 'URL to image',
    },
  ],
  loading: false,
  error: null,
};

export const saveOutfitAsync = createAsyncThunk('savedOutfit/saveOutfit', async (outfitData) => {
  const clothingItemsForNewOutfit = [];

  // Iterate through the outfitData.clothingItems object and build an array of clothing items
  for (const category in outfitData.clothingItems) {
    if (outfitData.clothingItems.hasOwnProperty(category)) {
      clothingItemsForNewOutfit.push({
        category,
        item: outfitData.clothingItems[category],
      });
    }
  }

  console.log("clothing Items",clothingItemsForNewOutfit);



  try {
    const outfitToSave = {
      name: outfitData.name,
      description: outfitData.description,
      user: outfitData.user,
      clothingItems: clothingItemsForNewOutfit,
      imageUrl: outfitData.imageUrl,
    };

    console.log("outfit to save", outfitToSave);
    console.log("clothingItems to save", outfitToSave.clothingItems);


    addToWardrobe(outfitToSave);

    const response = await axios.post(
      'https://kristobaricevic.com/api/outfit',
      outfitToSave
    );

    console.log("the response is", response);

    return response.data;
  } catch (error) {
    throw error;
  }
});

export const savedOutfitSlice = createSlice({
  name: 'savedOutfit',
  initialState,
  reducers: {
    reducers: {
      reducers: {
        addItem: (state, action) => {
          
          state.outfits[0].clothingItems.push(action.payload);
        },
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
            state.outfits.push(action.payload);
          })
          .addCase(saveOutfitAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
      }
    },
});

export const selectedOutfit = (state) => state.savedOutfit.outfits;
export const selectedOutfitLoading = (state) => state.savedOutfit.loading;
export const selectedOutfitError = (state) => state.savedOutfit.error;

export const { saveOutfit, deleteOutfit, addItem } = savedOutfitSlice.actions;
export const savedOutfitSliceReducer = savedOutfitSlice.reducer;

export default saveOutfitAsync; 
