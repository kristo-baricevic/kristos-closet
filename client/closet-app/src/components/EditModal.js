import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editingImage, setEditImage, categories, setCategory, closeEditModal, editCategory } from '../features/editModalSlice';

const EditModal = () => {
  const image = useSelector(editingImage);
  const [editedCategory, setEditedCategory] = useState(image.category);
  const uniqueCategories = useSelector(categories);
  const dispatch = useDispatch();


  const saveImageEdit = async (image) => {
    console.log("image test", image);
    console.log("test category", editedCategory);
    const updatedCategory = editedCategory;
    if (updatedCategory !== "") {
        await dispatch(editCategory({ imageId: image.id, category: updatedCategory }));
    }

    setEditImage(null);
    dispatch(closeEditModal());
  };

  const cancelImageEdit = () => {
    setEditImage(null);
    dispatch(closeEditModal());
  };

  return (
    <div className="category-container">
        <div className="edit-category-modal">
            <div className="edit-category">
            <h1>SELECT A NEW CATEGORY</h1>
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
    </div>
  );
};

export default EditModal;
