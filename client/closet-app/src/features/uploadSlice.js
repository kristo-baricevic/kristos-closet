import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isUploadingImage: false,
  uploadError: null,
};

export const uploadImageAndMetaData = createAsyncThunk(
  "user/uploadImageAndMetaData",
  async ( {imageFile, dbFormData} ) => {

    if (imageFile === null || dbFormData === null) {
      alert("You need to add a file!");
    } else {
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

        if (combinedFormData === null) {
          alert("No form data has been attached");
        } else {
            await axios.post(`https://kristobaricevic.com/api/upload`, combinedFormData, {
              headers,
            });
          };

        return combinedFormData;
      } catch (error) {
        throw error;
      }
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

export const uploadSliceReducer = uploadSlice.reducer;
