import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ImageUploader from './components/ImageUploader';
import PhotoStream from './components/Photostream';
import OutfitView from './components/OutfitView';
import RegistrationModal from './components/RegistrationModal';
import LoginModal from './components/LoginModal';
import {
  setRegistrationModalVisible,
  setLoginModalVisible,
  logoutUser,
  loginAnonymous,
} from './store/actions.js'; 

const App = ({ images }) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const isRegistrationModalVisible = useSelector(state => state.isRegistrationModalVisible);
  const isLoginModalVisible = useSelector(state => state.isLoginModalVisible);
  const isAuthenticated = useSelector(state => state.isAuthenticated);
  const dispatch = useDispatch();

  const [selectedItems, setSelectedItems] = useState({
    hat: null,
    top: null,
    bottom: null,
    onepiece: null,
    shoes: null,
    accessory: [],
  });

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const handleSelectImage = (image) => {
    const { category } = image;

    if (category.toLowerCase() === 'shoes') {
      setSelectedItems(prevSelected => ({ ...prevSelected, shoes: image }));
    } else if (category.toLowerCase() === 'bottom') {
      setSelectedItems(prevSelected => ({ ...prevSelected, bottom: image, onepiece: null }));
    } else if (category.toLowerCase() === 'top') {
      setSelectedItems(prevSelected => ({ ...prevSelected, top: image, onepiece: null }));
    } else if (category.toLowerCase() === 'hat') {
      setSelectedItems(prevSelected => ({ ...prevSelected, hat: image }));
    } else if (category.toLowerCase() === 'accessory') {
      if (selectedItems.accessory.length < 3) {
        setSelectedItems(prevSelected => ({ ...prevSelected, accessory: [...prevSelected.accessory, image] }));
      } else {
        console.log("Too many accessories");
      }
    } else if (category.toLowerCase() === 'onepiece') {
      setSelectedItems(prevSelected => ({ ...prevSelected, onepiece: image, top: null, bottom: null }));
    }
  };

  const handleRemoveItem = (item, category) => {
    if (category === 'accessory') {
      setSelectedItems(prevSelected => ({
        ...prevSelected,
        accessory: prevSelected.accessory.filter(accessory => accessory !== item),
      }));
    } else {
      setSelectedItems(prevSelected => ({ ...prevSelected, [category]: null }));
    }
  };

  const showRegistrationModal = () => {
    dispatch(setRegistrationModalVisible(true));
  };

  const showLoginModal = () => {
    dispatch(setLoginModalVisible(true));
  };

  const handleLogoutUser = () => {
    dispatch(logoutUser());
  };

  const handleLoginAnonymous = () => {
    dispatch(loginAnonymous());
  };

  const refreshPhotostream = async () => {
    try {
      // Perform the fetch operation or any data refreshing logic here
      const response = await fetch('/backend/Images');
      const data = await response.json();
      // Update state or perform other necessary actions with the data
      console.log("refreshPhotostream has run with updated data:", data);
    } catch (error) {
      console.error("Error refreshing photostream:", error);
    }
  };  

  return (
    <div className="body-container">
      <nav className="navbar">
        <ul className="navbar-menu">
          <li>
            <button className="registration-button" onClick={showRegistrationModal}>Register</button>
          </li>
          <li>
            {!isAuthenticated ? (
              <button className="login-button" onClick={showLoginModal}>Login</button>
            ) : (
              <button className="logout-button" onClick={handleLogoutUser}>Logout</button>
            )}
          </li>
          <li>
            <button className="demo-button" onClick={handleLoginAnonymous}>Demo</button>
          </li>
        </ul>
      </nav>

      {isRegistrationModalVisible && <RegistrationModal />}
      {isLoginModalVisible && <LoginModal />}

      <div className="image-uploader-container">
        <ImageUploader msg="Welcome to The Image Uploader!" onImageUploaded={refreshPhotostream} />
      </div>

      {isDesktop ? (
        <div className="desktop-layout">
          <div className="photostream-container">
            <PhotoStream images={images} onSelectImage={handleSelectImage} />
          </div>
          <div className="outfit-view-container">
            <OutfitView selectedItems={selectedItems} onRemoveItem={handleRemoveItem} className="outfit-view-desktop" />
          </div>
        </div>
      ) : (
        <div className="mobile-layout">
          <div className="photostream-container-mobile">
            <PhotoStream images={images} onSelectImage={handleSelectImage} />
          </div>
          <div className="outfit-view-container-mobile">
            <OutfitView selectedItems={selectedItems} onRemoveItem={handleRemoveItem} className="outfit-view-mobile" />
          </div>
        </div>
      )}

    </div>
  );
};

export default App;
