import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userIsAuthenticated } from '../features/userSlice';
import { setPreviewImage, setPreviewModalVisibility } from '../features/previewModalSlice'

const ImageUploader = () => {
  const dispatch = useDispatch();
  const userAuthenticated = useSelector(userIsAuthenticated);

  const handleFileUpload = (event) => {
    const image = event.target.files[0];
    console.log("image file", image);
    dispatch(setPreviewImage(image));
    dispatch(setPreviewModalVisibility(true));
  };

  return (
    <div className="upload-component-container">
      <div className="upload-container">
          <div className="upload-buttons-container">
            <label className="choose-file">
              <input
                type="file"
                id="uploadedFile"
                name="uploadedFile"
                accept=".jpg,.jpeg,.png,.gif"
                onChange={handleFileUpload}
              />
              +
            </label>
          </div>
        </div>             
      </div>

  );
};

export default ImageUploader;