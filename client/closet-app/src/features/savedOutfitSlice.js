import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  outfits: [],
  loading: false,
  error: null,
};

export const savedOutfitSlice = createSlice({
  name: 'savedOutfit',
  initialState,
  reducers: {
    saveOutfit: (state, action) => {
      const savedOutfit = action.payload; // This should be the entire saved outfit object

      // You may want to validate the savedOutfit here before adding it to the state

      state.outfits.push(savedOutfit);
    },
    deleteOutfit: (state, action) => {
      const outfitIdToDelete = action.payload;

      // Filter out the outfit to delete from the state
      state.outfits = state.outfits.filter((outfit) => outfit._id !== outfitIdToDelete);
    },
  },
});

export const selectedOutfits = (state) => state.savedOutfit.outfits;
export const selectedOutfitLoading = (state) => state.savedOutfit.loading;
export const selectedOutfitError = (state) => state.savedOutfit.error;

export const { saveOutfit, deleteOutfit } = savedOutfitSlice.actions;
export const savedOutfitSliceReducer = savedOutfitSlice.reducer;
