import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImageAndMetaData } from '../features/uploadSlice'; 
import { selectUser, userIsAuthenticated } from '../features/userSlice';

const ImageUploader = () => {
  const dispatch = useDispatch();
  const userAuthenticated = useSelector(userIsAuthenticated);
  const user = useSelector(selectUser);

  const [category, setCategory] = useState('');
  const [isUserImage, setIsUserImage] = useState(false);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    console.log("uploadedFile", uploadedFile);
    setImageFile(uploadedFile);
  };

  const [imageFile, setImageFile] = useState(null);

  const classifyImage = async () => {
    // if (!userAuthenticated) { 
    //   alert('You need to be logged in to upload an image.');
    //   return;
    // }

    if (!imageFile) {
      alert('Please choose an image file.');
      return;
    }

    console.log("front end imageFile", imageFile);

    const dbFormData = new FormData();
    
    dbFormData.append('user', user);
    dbFormData.append('category', category);
    dbFormData.append('isUserImage', isUserImage);

    console.log("user in frontend", user);
    console.log("dbFormData in front", dbFormData);

    dispatch(uploadImageAndMetaData({imageFile, dbFormData})); 

    // Clear the selected file and other inputs
    setImageFile(null);
    setCategory('');
    setIsUserImage(false);
  };

  return (
    <div className="upload-component-container">
      <h2 className="upload-title">Upload Your Article of Clothing</h2>
      <div className="upload-container">
        <form id="imageForm" method="post" encType="multipart/form-data">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Top">Top</option>
            <option value="Bottom">Bottom</option>
            <option value="onePiece">One-piece</option>
            <option value="Shoes">Shoes</option>
            <option value="Hat">Hat</option>
            <option value="Accessory">Accessory</option>
          </select>
          <label className="choose-file">
            <input
              type="file"
              id="uploadedFile"
              name="uploadedFile"
              accept=".jpg,.jpeg,.png,.gif"
              onChange={handleFileUpload}
            />
            Choose File
          </label>
          <button
            className="classify-button"
            id="classifyButton"
            type="button"
            onClick={classifyImage}
          >
            Upload
          </button>
        </form>
      </div>

      <p id="resultLabel"></p>

        {imageFile && <div class="upload-selected-image-container"><img id="uploadedImage" class="upload-selected-image" alt="Uploaded" src={URL.createObjectURL(imageFile)} /></div>}
      </div>
  );
};

export default ImageUploader;