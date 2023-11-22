import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  wardrobe: [],
  loading: false,
  error: null,
};

export const fetchOutfits = (userId) => async (dispatch) => {
  dispatch(fetchOutfitsStart());

  console.log("running fetchOutfits");

  try {
    console.log("inside the fetchOutfit try");
    const response = await axios.get(`https://kristobaricevic.com/api/outfit/${userId}`);
    console.log("fetchItems axios response", response);
    const data = response.data;
    dispatch(fetchOutfitsSuccess(data));
  } catch (error) {
    console.log("there is an error!!!", error);
    fetchOutfitsFailure(error);
    throw(error);
  }
};



export const wardrobeSlice = createSlice({
  name: 'wardrobe',
  initialState,
  reducers: {
    fetchOutfitsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchOutfitsSuccess: (state, action) => {
      state.loading = false;
      
      // Check for duplicate outfits and push only non-duplicates
      action.payload.forEach((newOutfit) => {
        if (!state.wardrobe.some((existingOutfit) => existingOutfit._id === newOutfit._id)) {
          state.wardrobe.push(newOutfit);
        }
      });
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

export const { fetchOutfitsStart, fetchOutfitsSuccess, fetchOutfitsFailure } = wardrobeSlice.actions;
export const wardrobeSliceReducer = wardrobeSlice.reducer;
