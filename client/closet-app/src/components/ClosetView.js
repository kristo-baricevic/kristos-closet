import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tabStyle, toggleTabStyle, fetchItems, deleteImage, deleteItems, selectInitialClosetItems, updateItem } from '../features/closetSlice';
import { addItem } from '../features/selectedItemsSlice';
import { userIsAuthenticated, selectUser } from '../features/userSlice';
import ImageModal from './ImageModal';
import { setModalImage, imageModalVisibility, openImageModal} from '../features/imageModalSlice';
import { editModalVisibility, setEditImage, setEditModalVisibility, setUniqueCategories } from '../features/editModalSlice';
import EditModal from './EditModal';

const ClosetView = () => {
  const isEditModalVisible = useSelector(editModalVisibility);
  const images = useSelector(selectInitialClosetItems);
  const [selectedCategory, setSelectedCategory] = useState(null);
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
    
    dispatch(setUniqueCategories(uniqueCategories));
    dispatch(setEditImage(image));
    dispatch(setEditModalVisibility(true));
  };

  const handleSelectImage = (image, category) => {
    dispatch(addItem({ category, item: image }));
  };
 
  return (
    <div className="closet-inner-container">
      {isImageModalVisible && <ImageModal />}
      {isEditModalVisible && <EditModal />}
          <div className="sticky-container">
            <div className="category-buttons-container">
              <button className="category-button" onClick={() => setSelectedCategory(null)}>All</button>
              {uniqueCategories.map(category => (
                <button key={category} className="category-button" onClick={() => setSelectedCategory(category)}>
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
                </div>
              </div>
            ))}
          </div>
    </div>
  );
};

export default ClosetView;
