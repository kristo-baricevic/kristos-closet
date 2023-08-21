import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    top: null,
    bottom: null,
    shoes: null,
    hat: null,
    onePiece: null,
    accessories: [],
}

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    addItem: (state, action) => {
        
        const { category, item } = action.payload;

        // Check if adding this item violates the constraints
        if (!isValidAddition(state, category, item)) {
            console.error('Invalid addition:', category, item);
            return;
        }

        // If item is a 'onePiece', remove 'top' and 'bottom' from the state
        if (item.category === 'onePiece') {
            state.top = null;
            state.bottom = null;
        } else if (item.category === 'top' || item.category === 'bottom') {
            // If item is 'top' or 'bottom', remove 'onePiece' from the state
            state.onePiece = null;
        }

        // Ensure that only up to three accessories can be added
        if (category === 'accessories' && state.accessories.length >= 3) {
            console.error('Too many accessories:', state.accessories);
            return;
        }

        // Update the state with the new item for the specified category
        state[category] = item;
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

export const { addItem, removeItem } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
