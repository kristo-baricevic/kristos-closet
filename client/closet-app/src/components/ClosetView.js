import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, editImage, deleteImage, selectInitialClosetItems } from '../features/closetSlice';
import { addItem } from '../features/selectedItemsSlice';


const ClosetView = ({ isAuthenticated }) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const images = useSelector(selectInitialClosetItems);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editedCategory, setEditedCategory] = useState(null);
  const [editingImageId, setEditingImageId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems());
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, [dispatch]);

  console.log("image structure", images);

  const uniqueCategories = [...new Set(images.map(image => image.category))];

  const filteredImages = selectedCategory
    ? images.filter(image => image.category === selectedCategory)
    : images;

  const checkScreenSize = () => {
    setIsDesktop(window.innerWidth >= 768);
  };

  const openImage = (image) => {
    // Open the image when clicked
  };

  const getImageUrl = (image) => {
    if (!image) {
      console.error('Invalid image URL:', image);
      return null;
    }


    return image.imageUrl;
  };

  const deleteImageHandler = async (image) => {
    if (!isAuthenticated) {
      alert('You must be logged in to delete items.');
      return;
    }

    if (!image.userId) {
      alert('You cannot delete shared items.');
      return;
    }

    try {
      await dispatch(deleteImage(image.id));
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

 
  const handleEditImage = (image) => {
    if (!isAuthenticated) {
      alert('You must be logged in to edit items.');
      return;
    }

    if (!image.userId) {
      alert('You cannot edit shared images.');
      return;
    }

    setEditingImageId(image.id);
    setEditedCategory(image.category);
  };

  const isEditing = (image) => {
    return editingImageId === image.id && image.isUserImage;
  };

  const saveImageEdit = async (image) => {
    const updatedCategory = editedCategory.trim();
    if (updatedCategory !== "") {
      await dispatch(editImage({ id: image.id, category: updatedCategory }));
    }

    setEditingImageId(null);
    setEditedCategory("");
  };

  const cancelImageEdit = () => {
    setEditingImageId(null);
    setEditedCategory("");
  };

  const handleSelectImage = (image, category) => {
    console.log("handleSelectImage", category)
    dispatch(addItem({ category, item: image }));
  };

  const filterByCategory = (category) => {
    setSelectedCategory(category);
  };
 
  return (
    <div>
      {isDesktop ? (
        <div>
          <div className="sticky-container">
            <div className="category-buttons-container">
              <button className="category-button" onClick={() => filterByCategory(null)}>All</button>
              {uniqueCategories.map(category => (
                <button key={category} className="category-button" onClick={() => filterByCategory(category)}>
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div className="closet-view">
            {filteredImages.map(image => (
              <div key={image.id} className="card" onClick={() => openImage(image)}>
                <img className="card-image" src={getImageUrl(image)} alt="closetItem" />
                <div className="card-info">
                  <div className="card-buttons-container">
                    <button className="delete-button" onClick={() => deleteImageHandler(image)}>Delete</button>
                    <button className="select-button" onClick={() => handleSelectImage(image, image.category)}>Select</button>
                    <button className="edit-button" onClick={() => handleEditImage(image)}>Edit</button>
                  </div>
                  <div className="category-container">
                    {isEditing(image) ? (
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
                        <button onClick={() => saveImageEdit(image)}>Save</button>
                        <button onClick={() => cancelImageEdit()}>Cancel</button>
                      </div>
                    ) : (
                      <div className="image-category">{image.category}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="sticky-container">
            <div className="category-buttons-container">
              <button className="category-button" onClick={() => filterByCategory(null)}>All</button>
              {uniqueCategories.map(category => (
                <button key={category} className="category-button" onClick={() => filterByCategory(category)}>
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div className="closet-view">
            {filteredImages.map(image => (
              <div key={image.id} className="card" onClick={() => openImage(image)}>
                <img className="card-image" src={getImageUrl(image)} alt="closetItem" />
                <div className="card-info">
                  <div className="card-buttons-container">
                    <button className="delete-button" onClick={() => deleteImageHandler(image)}>Delete</button>
                    <button className="select-button" onClick={() => handleSelectImage(image, image.category)}>Select</button>
                    <button className="edit-button" onClick={() => handleEditImage(image)}>Edit</button>
                  </div>
                  <div className="category-container">
                    {isEditing(image) ? (
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
                        <button onClick={() => saveImageEdit(image)}>Save</button>
                        <button onClick={() => cancelImageEdit()}>Cancel</button>
                      </div>
                    ) : (
                      <div className="image-category">{image.category}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClosetView;
