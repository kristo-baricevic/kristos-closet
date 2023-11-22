import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  wardrobe: [],
  loading: false,
  error: null,
};

export const fetchOutfits = () => async (dispatch) => {
  // dispatch(fetchOutfitsStart());

  console.log("running fetchOutfits");

  try {
    console.log("inside the fetchOutfit try");
    const response = await axios.get(`https://kristobaricevic.com/api/outfits`);
    console.log("fetchItems axios response", response);
    const data = response.data;

  } catch (error) {
    console.log("there is an error!!!", error);
    throw(error);
  }
};



export const wardrobeSlice = createSlice({
  name: 'wardrobe',
  initialState,
  reducers: {
    fetchOutfitsStart: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    fetchOutfitsSuccess: (state, action) => {
      state.loading = false;
      state.outfit = [...state.outfit, action.payload];
    },
    fetchOutfitsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const userWardrobe = (state) => state.wardrobe.wardrobe;
export const wardrobeLoading = (state) => state.wardrobe.loading;
export const wardrobeError = (state) => state.wardrobe.error;

export const { addToWardrobe, removeFromWardrobe, get } = wardrobeSlice.actions;
export const wardrobeSliceReducer = wardrobeSlice.reducer;
