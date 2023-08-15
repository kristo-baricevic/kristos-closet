import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '../store/actions'; 
import { selectUser } from '../features/userSlice';

const ImageUploader = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.isAuthenticated);
  const user = useSelector(selectUser);
  
  console.log("the user is", user);

  const [imageUrl, setImageUrl] = useState(null);
  const [category, setCategory] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setImageUrl(URL.createObjectURL(file));
  };

  const classifyImage = async (event) => {
    event.preventDefault();

    if (!isAuthenticated) { 
      alert('You need to be logged in to upload an image.');
      return;
    }

    const file = document.getElementById('imageFile').files[0];
    if (!file) {
      alert('Please choose an image file.');
      return;
    }

    const formData = new FormData();
    formData.append('imageFile', file);
    formData.append('category', category);
    formData.append('user', user);

    console.log("image upload", user);

    dispatch(uploadImage(formData)); 
    setImageUrl(null);
    setCategory('');
  };

  return (
    <div>
      <h2 className="upload-title">Upload Your Article of Clothing</h2>
      <div className="upload-container">
        <form action="http://localhost:5000/api/upload" id="imageForm" method="post" enctype="multipart/form-data">
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
        {imageUrl && <img id="uploadedImage" alt="Uploaded" src={imageUrl} />}
      </div>
    </div>
  );
};

export default ImageUploader;
