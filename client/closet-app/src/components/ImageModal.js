import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modalImage, closeImageModal, imageModalVisibility } from '../features/imageModalSlice';

const ImageModal = () => {
  const [detailVisibility, setDetailVisibility] = useState(false);
  const image = useSelector(modalImage);
  const dispatch = useDispatch();


  const handleCloseModal = () => {
    dispatch(closeImageModal());
  };

  const handleDetails = () => {
    setDetailVisibility(!detailVisibility);
  }

  const getImageUrl = (image) => {
    if (!image) {
      console.error('Invalid image URL:', image);
      return null;
    }


    return image.imageUrl;
  };

  return (
    <div className="modal-background">
      <div className="image-modal">
        <div className="image-modal-content">
          <div className="image-modal-content-container">
            <img className="image-modal-image" src={getImageUrl(image)} alt="selected item in a modal"/>
          </div>
          <div class="image-modal-buttons">
            <button className="image-close-button" onClick={handleCloseModal}>Close</button>
            <button className="image-close-button" onClick={handleDetails}>Details</button>
          </div>
          {detailVisibility && (
            <div className="detail-view">
              <p>This is some text about the item.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
