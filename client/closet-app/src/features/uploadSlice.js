import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isUploadingImage: false,
  uploadError: null,
};

export const uploadImageAndMetaData = createAsyncThunk(
  "user/uploadImageAndMetaData",
  async ({ imageFile, dbFormData }, { dispatch }) => {
    dispatch(uploadImageRequest());
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const combinedFormData = new FormData();
      combinedFormData.append("imageFile", imageFile);
      for (const [key, value] of dbFormData.entries()) {
        combinedFormData.append(key, value);
      }

      await axios.post("http://localhost:5000/api/upload", combinedFormData, {
        headers,
      });

      dispatch(uploadImageSuccess());
    } catch (error) {
      dispatch(uploadImageFailure(error));
    }
  }
);

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    uploadImageRequest: (state) => {
      state.isUploadingImage = true;
      state.uploadError = null;
    },
    uploadImageSuccess: (state) => {
      state.isUploadingImage = false;
      state.uploadError = null;
    },
    uploadImageFailure: (state, action) => {
      state.isUploadingImage = false;
      state.uploadError = action.payload;
    },
  },
});

export const {
  uploadImageRequest,
  uploadImageSuccess,
  uploadImageFailure,
} = uploadSlice.actions;

export const selectIsUploadingImage = (state) => state.upload.isUploadingImage;
export const selectUploadError = (state) => state.upload.uploadError;

export default uploadSlice.reducer;
