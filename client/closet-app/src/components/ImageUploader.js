import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setPreviewImage, setPreviewModalVisibility } from '../features/previewModalSlice'

const ImageUploader = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);


  const handleFileUpload = (event) => {
    try {
      console.log("ImageUploader method");
      const image = event.target.files[0];
      dispatch(setPreviewImage(image));
      dispatch(setPreviewModalVisibility(true));
      fileInputRef.current.value = null;

    } catch (error) {
      console.log(error, "ERROR UPLOADING FILE");
    };
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