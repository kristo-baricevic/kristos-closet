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

        // Check if adding this item violates the constraints
        if (!isValidAddition(state, category, item)) {
            console.error('Invalid addition:', category, item);
            return;
        }

        // If item is a 'onePiece', remove 'top' and 'bottom' from the state
        if (item.category === 'onePiece') {
            state.Top = null;
            state.Bottom = null;
        } else if (item.category === 'Top' || item.category === 'Bottom') {
            // If item is 'top' or 'bottom', remove 'onePiece' from the state
            state.onePiece = null;
        }

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

      const { category, itemId } = action.payload;
      
      // Update the state by removing the item from the specified category
      state[category] = state[category].filter(item => item.id !== itemId);
    },
  },
});

// Function to check if adding a certain item is valid based on constraints
function isValidAddition(state, category, newItem) {
  if (category === 'accessories' && state.accessories.length >= 3) {
    console.error('too many accessories');
    return false; // Too many accessories
  }

  if (newItem.category === 'onePiece') {
    return !state.top && !state.bottom;
  }

  if (newItem.category === 'top' || newItem.category === 'bottom') {
    return !state.onePiece;
  }

  return true;
}

export const selectedItems = (state) => state.selectedItems.items;
export const selectedItemsLoading = (state) => state.selectedItems.loading;
export const selectedItemsError = (state) => state.selectedItems.error;

export const { addItem, removeItem } = selectedItemsSlice.actions;
export const selectedItemsSliceReducer = selectedItemsSlice.reducer;
