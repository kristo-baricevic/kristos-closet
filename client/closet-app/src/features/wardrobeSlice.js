import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wardrobe: [],
  loading: false,
  error: null,
};

export const wardrobeSlice = createSlice({
  name: 'wardrobe',
  initialState,
  reducers: {
    addToWardrobe: (state, action) => {
      const outfit = action.payload; // This should be the entire outfit object

      // You may want to validate the outfit here before adding it to the state

      state.wardrobe.push(outfit);
    },
    removeFromWardrobe: (state, action) => {
      const outfitIdToRemove = action.payload;

      // Filter out the outfit to remove from the state
      state.wardrobe = state.wardrobe.filter((outfit) => outfit._id !== outfitIdToRemove);
    },
  },
});

export const selectedWardrobe = (state) => state.wardrobe.wardrobe;
export const wardrobeLoading = (state) => state.wardrobe.loading;
export const wardrobeError = (state) => state.wardrobe.error;

export const { addToWardrobe, removeFromWardrobe } = wardrobeSlice.actions;
export const wardrobeSliceReducer = wardrobeSlice.reducer;
