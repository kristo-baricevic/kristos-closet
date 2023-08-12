import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '../store/actions'; // Assuming you have an uploadImage action

const ImageUploader = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.isAuthenticated);
  const user = useSelector(state => state.user);

  const [imageUrl, setImageUrl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setImageUrl(URL.createObjectURL(file));
  };

  const classifyImage = (event) => {
    event.preventDefault();

    if (!isAuthenticated) {
      alert('You need to be logged in to upload an image.');
      return;
    }

    const file = document.getElementById('imageFile').files[0];
    const formData = new FormData();
    formData.append('imageFile', file);
    formData.append('category', selectedCategory);
    formData.append('userId', user.id);

    dispatch(uploadImage(formData)); // Dispatch your uploadImage action here
    setImageUrl(null);
    setSelectedCategory('');
  };

  return (
    <div>
      <h2 className="upload-title">Upload Your Article of Clothing</h2>
      <div className="upload-container">
        <form action="http://localhost:5000/api/upload" id="imageForm" method="post" enctype="multipart/form-data">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
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
              required
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
