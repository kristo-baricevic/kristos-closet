import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modalImage, closeEditModal, editModalVisibility } from '../features/editModalSlice';

const EditModal = () => {
  const isEditModalVisible = useSelector(editModalVisibility);
  const image = useSelector(modalImage);
  const dispatch = useDispatch();


  const handleCloseModal = () => {
    dispatch(closeEditModal());
  };

  return (
    <div className="edit-category-modal">
      <div className="edit-category">
      <select
            value={editedCategory}
            onChange={event => setEditedCategory(event.target.value)}
            onKeyUp={event => {
            if (event.key === 'Enter') {
                saveImageEdit(image);
            }
            }}
        >
            {uniqueCategories.map(category => (
            <option key={category} value={category}>{category}</option>
            ))}
        </select>
        <div className="edit-modal-button-container">
            <button class="edit-modal-button" onClick={() => saveImageEdit(image)}>Save</button>
            <button class="edit-modal-button" onClick={() => cancelImageEdit()}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
