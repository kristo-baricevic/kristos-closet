import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userIsAuthenticated } from '../features/userSlice';
import { setPreviewImage, setPreviewModalVisibility } from '../features/previewModalSlice'

const ImageUploader = () => {
  const dispatch = useDispatch();
  const userAuthenticated = useSelector(userIsAuthenticated);
  const fileInputRef = useRef(null);


  const handleFileUpload = (event) => {
    const image = event.target.files[0];
    console.log("image file", image);
    dispatch(setPreviewImage(image));
    dispatch(setPreviewModalVisibility(true));
    fileInputRef.current.value = null;
  };

  return (
      <div className="navbar-buttons-container">
            <label className="navbar-button">
              <input
                type="file"
                ref={fileInputRef}
                id="uploadedFile"
                name="uploadedFile"
                accept=".jpg,.jpeg,.png,.gif"
                onChange={handleFileUpload}
              />
              Upload<br /> Item
            </label>
        </div>             
  );
};

export default ImageUploader;