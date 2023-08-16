import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImageAndMetaData } from '../store/actions'; 
import { selectUser } from '../features/userSlice';

const ImageUploader = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.isAuthenticated);
  const user = useSelector(selectUser);

  const [category, setCategory] = useState('');
  const [isUserImage, setIsUserImage] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const [file, setFile] = useState(null);

  const classifyImage = async () => {
    if (!isAuthenticated) { 
      alert('You need to be logged in to upload an image.');
      return;
    }

    if (!file) {
      alert('Please choose an image file.');
      return;
    }

    const dbFormData = new FormData();
    dbFormData.append('user', user);
    dbFormData.append('category', category);
    dbFormData.append('isUserImage', isUserImage);

    dispatch(uploadImageAndMetaData(file, dbFormData)); 

    // Clear the selected file and other inputs
    setFile(null);
    setCategory('');
    setIsUserImage(false);
  };

  return (
    <div>
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
              id="imageFile"
              name="imageFile"
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
            Upload Image
          </button>
        </form>
      </div>

      <p id="resultLabel"></p>

      <div id="imageContainer">
        {file && <img id="uploadedImage" alt="Uploaded" src={URL.createObjectURL(file)} />}
      </div>
    </div>
  );
};

export default ImageUploader;