import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    items: {
      Top: null,
      Bottom: null,
      Shoes: null,
      Hat: null,
      onePiece: null,
      Accessory: null,
    },
  loading: false,
  error: null,
};

export const selectOutfit = (objectId) => async (dispatch) => {
  const response = await axios.get(`https://kristobaricevic.com/api/outfit/${objectId}`);
  console.log("outfit response", response.data);
  dispatch(addOutfit(response.data));
};

export const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    addItem: (state, action) => {
        
        const { category, item, imageUrl } = action.payload;
        console.log("category", category);
        console.log("item check", item);
        console.log("url check", imageUrl);

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

        // Update the state with the new item for the specified category
        state.items[category] = item;
        console.log("state check", state.items[category]);
    },
    removeItem: (state, action) => {

      const { category, item } = action.payload;
      console.log("inside remove item in selectedItemsSlice.js");
      console.log("category is", category);
      console.log("item is", item);
      // state.items[category] = null;
      // console.log("state test", state.items.category);      

   
      if (Array.isArray(state.items[category])) {
        // If the category is an array, filter it to remove the item by its id
        state.items[category] = state.items[category].filter(itemObj => itemObj.id !== item.id);
      } else if (state.items[category] && typeof state.items[category] === 'object') {
        // If the category is an object, set it to null
        state.items[category] = null;
      }   
    },
    addOutfit: (state, action) => {
      const outfit = action.payload; // Assuming the payload is the outfit object
      console.log("addOutfit", outfit);
    
      // Update each category in state.items with the corresponding item from the outfit
      state.items.Top = outfit.Top || null;
      state.items.Bottom = outfit.Bottom || null;
      state.items.Shoes = outfit.Shoes || null;
      state.items.Hat = outfit.Hat || null;
      state.items.onePiece = outfit.onePiece || null;
      state.items.Accessory = outfit.Accessory || null;
    },
  },
});

export const selectedItems = (state) => state.selectedItems.items;
export const selectedItemsLoading = (state) => state.selectedItems.loading;
export const selectedItemsError = (state) => state.selectedItems.error;

export const { addItem, removeItem, addOutfit } = selectedItemsSlice.actions;
export const selectedItemsSliceReducer = selectedItemsSlice.reducer;
