import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ImageUploader from './components/ImageUploader';
import ClosetView from './components/ClosetView';
import OutfitView from './components/OutfitView';
import NavBar from './components/NavBar';
import RegistrationModal from './components/RegistrationModal';
import LoginModal from './components/LoginModal';

import './App.css';

const App = ({ images }) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const isRegistrationModalVisible = useSelector(state => state.isRegistrationModalVisible);
  const isLoginModalVisible = useSelector(state => state.isLoginModalVisible);

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

  const refreshClosetView = async () => {
    try {
      // Perform the fetch operation or any data refreshing logic here
      const response = await fetch('/backend/Images');
      const data = await response.json();
      // Update state or perform other necessary actions with the data
      console.log("refreshClosetView has run with updated data:", data);
    } catch (error) {
      console.error("Error refreshing closetview:", error);
    }
  };  

  return (
    <div className="body-container">
      
      <NavBar />

      {isRegistrationModalVisible && <RegistrationModal />}
      {isLoginModalVisible && <LoginModal />}

      <div className="image-uploader-container">
        <ImageUploader msg="Welcome to The Image Uploader!" onImageUploaded={refreshClosetView} />
      </div>

      {isDesktop ? (
        <div className="desktop-layout">
          <div className="closetview-container">
            <ClosetView images={images} onSelectImage={handleSelectImage} />
          </div>
          <div className="outfit-view-container">
            <OutfitView selectedItems={selectedItems} onRemoveItem={handleRemoveItem} className="outfit-view-desktop" />
          </div>
        </div>
      ) : (
        <div className="mobile-layout">
          <div className="closetview-container-mobile">
            <ClosetView images={images} onSelectImage={handleSelectImage} />
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
