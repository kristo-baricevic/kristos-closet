import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editingImage, setEditImage, categories, closeEditModal, editCategory } from '../features/editModalSlice';
import { fetchItems } from '../features/closetSlice';

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

    dispatch(fetchItems());
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
            <h3>Select A New Category</h3>
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
                    <button className="edit-modal-button" onClick={() => saveImageEdit(image)}>Save</button>
                    <button className="edit-modal-button" onClick={() => cancelImageEdit()}>Cancel</button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default EditModal;
