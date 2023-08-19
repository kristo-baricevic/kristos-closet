import { createSlice } from '@reduxjs/toolkit';

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState: {
    closet: [],
    accessory: [],
  },
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
        state.closet = state.closet.filter(selectedItem => selectedItem.category !== 'top' && selectedItem.category !== 'bottom');
      } else if (item.category === 'top' || item.category === 'bottom') {
        // If item is 'top' or 'bottom', remove 'onePiece' from the state
        state.closet = state.closet.filter(selectedItem => selectedItem.category !== 'onePiece');
      }

      // Ensure that only up to three accessories can be added
      if (category === 'accessory' && state.accessory.length >= 3) {
        console.error('Too many accessories:', state.accessory);
        return;
      }

      state[category].push(item);
    },
    removeItem: (state, action) => {
      const { category, itemId } = action.payload;
      state[category] = state[category].filter(item => item.id !== itemId);
    },
  },
});

// Function to check if adding a certain item is valid based on constraints
function isValidAddition(state, category, newItem) {
  if (category === 'accessory' && state.accessory.length >= 3) {
    return false; // Too many accessories
  }

  if (newItem.category === 'onePiece') {
    return !state.closet.some(item => item.category === 'top' || item.category === 'bottom');
  }

  if (newItem.category === 'top' || newItem.category === 'bottom') {
    return !state.closet.some(item => item.category === 'onePiece');
  }

  return true;
}

export const { addItem, removeItem } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
