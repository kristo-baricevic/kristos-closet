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
  },
});

export const {
  setRegistrationModalVisible,
  setLoginModalVisible,
} = modalSlice.actions;

export const RegistrationModalVisibility = (state) =>
  state.modal.isRegistrationModalVisible;
export const LoginModalVisibility = (state) =>
  state.modal.isLoginModalVisible;

export const modalSliceReducer = modalSlice.reducer;
