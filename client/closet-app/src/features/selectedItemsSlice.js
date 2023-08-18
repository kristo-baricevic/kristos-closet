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
      state[category].push(item);
    },
    removeItem: (state, action) => {
      const { category, itemId } = action.payload;
      state[category] = state[category].filter(item => item.id !== itemId);
    },
  },
});

export const { addItem, removeItem } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
