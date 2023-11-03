import { createSlice } from '@reduxjs/toolkit';
import { selectedItemsSlice } from './selectedItemsSlice';

const initialState = {
    savedOutfit: {
      outfit: selectedItemsSlice,
  },
  loading: false,
  error: null,
};

export const savedOutfitSlice = createSlice({
  name: 'savedOutfit',
  initialState,
  reducers: {
    saveOutfit: (state, action) => {
        
        const { outfit, selectedItems } = action.payload;
        console.log("outfit", outfit);
        console.log("item check", selectedItems);

             // If item is a 'onePiece', remove 'top' and 'bottom' from the state
        if (outfit.selectedItems === 'selectedItems') {
            console.log("this is already an outfit");
            return;            
        } else return outfit;

        // create outfit by adding automatically into wardrobe??

    },
    deleteOutfit: (state, action) => {

     // deletes outfit      

   
    },
  },
});

export const selectedOutfit = (state) => state.savedOutfit.items;
export const selectedOutfitLoading = (state) => state.savedOutfit.loading;
export const selectedOutfitError = (state) => state.savedOutfit.error;

export const { addItem, removeItem } = savedOutfitSlice.actions;
export const savedOutfitSliceReducer = savedOutfitSlice.reducer;
