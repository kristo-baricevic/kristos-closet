import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isRegistrationModalVisible: false,
  isLoginModalVisible: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setRegistrationModalVisible: (state, action) => {
      state.isRegistrationModalVisible = action.payload;
    },
    setLoginModalVisible: (state, action) => {
      state.isLoginModalVisible = action.payload;
    },
    // ... other actions related to modals
  },
});

export const {
  setRegistrationModalVisible,
  setLoginModalVisible,
  // ... other exported actions
} = modalSlice.actions;

export const selectIsRegistrationModalVisible = (state) =>
  state.modal.isRegistrationModalVisible;
export const selectIsLoginModalVisible = (state) =>
  state.modal.isLoginModalVisible;

export default modalSlice.reducer;
