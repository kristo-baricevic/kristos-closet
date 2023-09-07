import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tabStyle, toggleTabStyle, fetchItems, deleteImage, deleteItems, selectInitialClosetItems, editCategory } from '../features/closetSlice';
import { addItem } from '../features/selectedItemsSlice';
import { userIsAuthenticated, selectUser } from '../features/userSlice';
import ImageModal from './ImageModal';
import { setModalImage, imageModalVisibility, openImageModal} from '../features/imageModalSlice';

const ClosetView = () => {
  const images = useSelector(selectInitialClosetItems);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editedCategory, setEditedCategory] = useState(null);
  const [editingImageId, setEditingImageId] = useState(null);
  const isAuthenticated = useSelector(userIsAuthenticated);
  const isImageModalVisible = useSelector(imageModalVisibility);
  const user = useSelector(selectUser);
  const tabToggle = useSelector(tabStyle);
  const dispatch = useDispatch();
  

  dispatch(toggleTabStyle);
  
  useEffect(() => {
    dispatch(fetchItems());
    console.log(tabToggle, "truth is out there?");
  }, []);

  // console.log("image structure", images);

  const uniqueCategories = [...new Set(images.map(image => image.category))];

  const filteredImages = selectedCategory
    ? images.filter(image => image.category === selectedCategory)
    : images;

  const openImage = (image) => {
    dispatch(setModalImage(image));
    dispatch(openImageModal());
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

    // if (!image.userId) {
    //   alert('You cannot delete shared items.');
    //   return;
    // }

    console.log("image.userId", image.id)
    const imageId = image.id;

    dispatch(deleteItems(imageId));
    dispatch(deleteImage(imageId));
    return;
  };

 
  const handleEditImage = (image) => {
    if (!isAuthenticated) {
      alert('You must be logged in to edit items.');
      return;
    }

    console.log("image.userId", image.id);
    console.log("user id", user._id);
    
    // if (image.id !== user._id) {
    //   alert('You cannot edit shared images.');
    //   return;
    // }

    setEditingImageId(image.id);
    setEditedCategory(image.category);
  };

  const isEditing = (image) => {
    return editingImageId === image.id && image.isUserImage;
  };

  const saveImageEdit = async (image) => {
    const updatedCategory = editedCategory.trim();
    if (updatedCategory !== "") {
      await dispatch(editCategory(image.id, updatedCategory));
    }

    setEditingImageId(null);
    setEditedCategory("");
  };

  const cancelImageEdit = () => {
    setEditingImageId(null);
    setEditedCategory("");
  };

  const handleSelectImage = (image, category) => {
    console.log("handleSelectImage", category);
    dispatch(addItem({ category, item: image }));
  };

  const filterByCategory = (category) => {
    console.log("category clicked", category);
    setSelectedCategory(category);
  };
 
  return (
    <div className="closet-inner-container">
      {isImageModalVisible && <ImageModal />}
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
                <div key={image.id} className={tabToggle ? "card-tab-open" : "card"} >
                  <img className="card-image" src={getImageUrl(image)} onClick={() => openImage(image)} alt="closetItem" />
                <div className="card-info">
                  <div className={tabToggle ? "card-buttons-container-tab-open" : "card-buttons-container"} >
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
                      <div className="image-category">
                        {/* {image.category} */}
                        </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
    </div>
  );
};

export default ClosetView;
