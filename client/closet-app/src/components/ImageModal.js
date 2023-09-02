import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modalImage, closeImageModal, imageModalVisibility } from '../features/imageModalSlice';

const ImageModal = () => {
  const isImageModalVisible = useSelector(imageModalVisibility);
  const image = useSelector(modalImage);
  const dispatch = useDispatch();


  const handleCloseModal = () => {
    dispatch(closeImageModal());
  };

  const getImageUrl = (image) => {
    if (!image) {
      console.error('Invalid image URL:', image);
      return null;
    }


    return image.imageUrl;
  };

  return (
    <div className="modal-background">
      <div className={`image-modal ${isImageModalVisible ? 'visible' : ''}`}>
        <div className="image-modal-content">
            <img className="image-modal-image" src={getImageUrl(image)} alt="selected item in a modal"/>
          <button className="image-close-button" onClick={handleCloseModal}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
