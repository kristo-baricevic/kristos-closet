import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    wardrobe: {
      Outfit: null,
  },
  loading: false,
  error: null,
};

export const wardrobeSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    addToWardrobe: (state, action) => {
        
        const { wardrobe, outfit } = action.payload;
        console.log("wardrobe", wardrobe);
        console.log("item check", outfit);

        // If item is a 'onePiece', remove 'top' and 'bottom' from the state
        if (wardrobe.outfit === 'outfit') {
            console.log("this outfit is already in the wardrobe");
            state.items.Outfit = null;
        } else {
            state.items[wardrobe] = wardrobe.push(outfit);
        }
        

        console.log("state check", wardrobe);        

        // Update the state with the new item for the specified category
        state.wardrobe[outfit] = outfit;
        console.log("state check", state.wardrobe[outfit]);
    },
    removeFromWardobe: (state, action) => {

      const { wardrobe, outfit } = action.payload;
      console.log("inside remove item in selectedItemsSlice.js");
      console.log("category is", wardrobe);
      console.log("item is", outfit);
      // state.items[category] = null;
      // console.log("state test", state.items.category);      

   
      if (Array.isArray(state.wardrobe[outfit])) {
        // If the category is an array, filter it to remove the item by its id
        state.wardrobe[outfit] = state.wardrobe[outfit].filter(itemObj => itemObj.id !== wardrobe.id);
      } else if (state.wardrobe[outfit] && typeof state.wardrobe[outfit] === 'object') {
        // If the category is an object, set it to null
        state.wardrobe[outfit] = null;
      }   
    },
  },
});

export const wardrobe = (state) => state.wardrobe.items;
export const wardrobeLoading = (state) => state.wardrobe.loading;
export const wardrobeError = (state) => state.wardrobe.error;

export const { addToWardrobe, removeFromWardobe } = wardrobeSlice.actions;
export const wardrobeSliceReducer = wardrobeSlice.reducer;
