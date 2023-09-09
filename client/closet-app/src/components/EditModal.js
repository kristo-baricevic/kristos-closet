import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editingImage, setEditImage, categories, setCategory, closeEditModal, editModalVisibility } from '../features/editModalSlice';

const EditModal = () => {
  const isEditModalVisible = useSelector(editModalVisibility);
  const image = useSelector(editingImage);
  const uniqueCategories = useSelector(categories);
  const dispatch = useDispatch();
  const category = image.category;
//   const [editedCategory, setEditedCategory] = useState(null);


  const isEditing = (image) => {
    return editingImageId === image.id && image.isUserImage;
  };

  const saveImageEdit = async (image) => {
    const updatedCategory = editedCategory.trim();
    if (updatedCategory !== "") {
      await dispatch(setCategory(updatedCategory));
    }

    setEditImage(null);
  };

  const handleCloseModal = () => {
    dispatch(closeEditModal());
  };

  const cancelImageEdit = () => {
    setEditImage(null);
    setEditedCategory("");
  };

  return (
    <div className="edit-category-modal">
      <div className="edit-category">
      <select
            value={category}
            onChange={event => setCategory(event.target.value)}
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
