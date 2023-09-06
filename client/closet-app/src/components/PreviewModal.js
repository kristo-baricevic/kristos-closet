import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { previewModalImage, closePreviewModal, setPreviewImage } from '../features/previewModalSlice.js';
import { uploadImageAndMetaData } from '../features/uploadSlice.js';
import { selectUser } from '../features/userSlice.js';

const PreviewModal = () => {

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [isUserImage, setIsUserImage] = useState(false);
  const [category, setCategory] = useState('');
  const image = useSelector(previewModalImage);

  const imageURL = URL.createObjectURL(image);
  console.log("preview modal", image);

  const handleCancelModal = () => {
    dispatch(closePreviewModal(false));
  };

  const handleUpload = async() => {

    // declare formData and append event
    const dbFormData = new FormData();
    
    dbFormData.append('imageFile', image);
    dbFormData.append('user', user);
    dbFormData.append('category', category);
    dbFormData.append('isUserImage', isUserImage);

    console.log("params before await in front", image, dbFormData);
    
    try{
      await dispatch(uploadImageAndMetaData({ image, dbFormData})); 
      console.log("after fetchItems");
      // Clear the selected file and other inputs
      setPreviewImage(null);
      setCategory('');
      setIsUserImage(false);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }


  return (
    <div className="preview-modal-background">
      <div className="preview-image-modal">
        <div className="preview-image-modal-content">
        <form id="imageForm" method="post" encType="multipart/form-data">
          <select className="select-options-bar"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Default">Select Category</option>
            <option value="Top">Top</option>
            <option value="Bottom">Bottom</option>
            <option value="onePiece">One-piece</option>
            <option value="Shoes">Shoes</option>
            <option value="Hat">Hat</option>
            <option value="Accessory">Accessory</option>
          </select>
        </form>
            <img className="preview-image-modal-image" src={imageURL} alt="selected item in a modal"/>
          <button className="preview-image-close-button" onClick={handleCancelModal}>Cancel</button>
          <button className="classify-button" id="classifyButton" onClick={handleUpload}>Upload</button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
