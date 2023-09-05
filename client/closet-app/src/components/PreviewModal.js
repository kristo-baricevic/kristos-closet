import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { previewModalImage, closePreviewModal } from '../features/previewModalSlice.js';

const PreviewModal = () => {
  const dispatch = useDispatch();
  const image = useSelector(previewModalImage);
  console.log("preview modal", image);


  const handleCloseModal = () => {
    dispatch(closePreviewModal(false));
  };


  return (
    <div className="preview-modal-background">
      <div className="preview-image-modal">
        <div className="preview-image-modal-content">
            <img className="preview-image-modal-image" src={image} alt="selected item in a modal"/>
          <button className="preview-image-close-button" onClick={handleCloseModal}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
