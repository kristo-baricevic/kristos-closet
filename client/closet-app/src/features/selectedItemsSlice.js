import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: {
      Top: null,
      Bottom: null,
      Shoes: null,
      Hat: null,
      onePiece: null,
      Accessories: [],
  },
  loading: false,
  error: null,
};

export const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    addItem: (state, action) => {
        
        const { category, item } = action.payload;
        console.log("category", category);
        console.log("item check", item);

        // If item is a 'onePiece', remove 'top' and 'bottom' from the state
        if (item.category === 'onePiece') {
            console.log("onePiece selected");
            state.items.Top = null;
            state.items.Bottom = null;
        } else if (item.category === 'Top' || item.category === 'Bottom') {
            // If item is 'top' or 'bottom', remove 'onePiece' from the state
            state.items.onePiece = null;
        }

        console.log("state check", state);

        // Ensure that only up to three accessories can be added
        if (category === 'Accessories' && state.accessories.length >= 3) {
            console.error('Too many accessories:', state.accessories);
            return;
        }

        // Update the state with the new item for the specified category
        state.items[category] = item;
        console.log("state check", state.items[category]);
    },
    removeItem: (state, action) => {

      const { category, item } = action.payload;
      console.log("inside remove item in selectedItemsSlice.js");
      console.log("category is", category);
      console.log("item is", item);
      state.items[category] = null;
      console.log("state test", state.items.category);      

      // if (Array.isArray(state[category])) {
      //   // If the category is an array, filter it to remove the item by its id
      //   state[category] = state[category].filter(itemObj => itemObj.id !== item.id);
      // } else if (state[category] && typeof state[category] === 'object') {
      //   // If the category is an object, set it to null
      //   state.items[category] = null;
      // }    
    },
  },
});

export const selectedItems = (state) => state.selectedItems.items;
export const selectedItemsLoading = (state) => state.selectedItems.loading;
export const selectedItemsError = (state) => state.selectedItems.error;

export const { addItem, removeItem } = selectedItemsSlice.actions;
export const selectedItemsSliceReducer = selectedItemsSlice.reducer;
