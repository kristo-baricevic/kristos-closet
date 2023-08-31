import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ImageUploader from './components/ImageUploader';
import ClosetView from './components/ClosetView';
import OutfitView from './components/OutfitView';
import NavBar from './components/NavBar';
import RegistrationModal from './components/RegistrationModal';
import LoginModal from './components/LoginModal';
import { loginUser, userIsAuthenticated } from './features/userSlice';
import { RegistrationModalVisibility, LoginModalVisibility } from './features/modalSlice';
import { removeItem, addItem } from './features/selectedItemsSlice';

import './App.css';

  const App = ({ images }) => {
    
    const [isDesktop, setIsDesktop] = useState(false);
  
    const isRegistrationModalVisible = useSelector(RegistrationModalVisibility);
    const isLoginModalVisible = useSelector(LoginModalVisibility);
    const isAuthenticated = useSelector(userIsAuthenticated);
    // const selectedItems = useSelector(selectedItemsSliceReducer)
    const state = useSelector(state => state.selectedItems);


    const dispatch = useDispatch();

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

    // useEffect(() => {
    //   // Fetch user data once the component mounts
    //   if (!isAuthenticated) {
    //     dispatch(loginUser({ username: 'yourUsername', password: 'yourPassword' }));
    //   }
    // }, [dispatch, isAuthenticated]);

    const handleSelectItem = (image) => {
      const { category } = image;
      const lowercaseCategory = category.toLowerCase();
    
      if (lowercaseCategory === 'shoes' || lowercaseCategory === 'bottom') {
        dispatch(addItem({ category: 'bottom', item: image }));
      } else if (lowercaseCategory === 'top') {
        dispatch(addItem({ category: 'top', item: image }));
      } else if (lowercaseCategory === 'hat') {
        dispatch(addItem({ category: 'hat', item: image }));
      } else if (lowercaseCategory === 'accessory') {
        if (state.accessories.length < 3) {
          dispatch(addItem({ category: 'accessories', item: image }));
        } else {
          console.log("Too many accessories");
        }
      } else if (lowercaseCategory === 'onepiece') {
        dispatch(addItem({ category: 'onePiece', item: image }));
      }
    };
    
    const handleRemoveItem = (item, category) => {
      if (category === 'accessory') {
        dispatch(removeItem({ category, item }));
        } else {
        dispatch(prevSelected => ({ ...prevSelected, [category]: null }));
      }
    };

    const refreshClosetView = async () => {
      try {
        // Perform the fetch operation or any data refreshing logic here
        // const response = await fetch('/backend/Images');
        // const data = await response.json();
        // Update state or perform other necessary actions with the data
        // console.log("refreshClosetView has run with updated data:", data);
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
              <ClosetView images={images} onSelectImage={handleSelectItem} />
            </div>
            <div className="outfit-view-container">
              <OutfitView onRemoveItems={handleRemoveItem} onRemoveItem={handleRemoveItem} className="outfit-view-desktop" />
            </div>
          </div>
        ) : (
          <div className="mobile-layout">
            <div className="closetview-container-mobile">
              <ClosetView images={images} onSelectImage={handleSelectItem} />
            </div>
            <div className="outfit-view-container-mobile">
              <OutfitView onRemoveItem={handleRemoveItem} className="outfit-view-mobile" />
            </div>
          </div>
        )}

      </div>
  );
};

export default App;
