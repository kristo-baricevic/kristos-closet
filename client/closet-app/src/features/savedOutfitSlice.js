import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



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

    console.log("outfit to save",outfitToSave);

    const response = await axios.post(
      'https://kristobaricevic.com/api/outfit',
      outfitToSave
    );

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
          const { category, objectId } = action.payload;
          
          // If item is a 'onePiece', remove 'top' and 'bottom' from the state
          if (category === 'onePiece') {
            state.outfits[0].clothingItems = state.outfits[0].clothingItems.filter(item => item.category !== 'Top' && item.category !== 'Bottom');
          } else if (category === 'Top' || category === 'Bottom') {
            // If item is 'top' or 'bottom', remove 'onePiece' from the state
            state.outfits[0].clothingItems = state.outfits[0].clothingItems.filter(item => item.category !== 'onePiece');
          }
      
          // Add the new item to the outfit's clothingItems array
          state.outfits[0].clothingItems.push({ category, item: objectId });
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

export const { saveOutfit, deleteOutfit } = savedOutfitSlice.actions;
export const savedOutfitSliceReducer = savedOutfitSlice.reducer;

export default saveOutfitAsync; 
