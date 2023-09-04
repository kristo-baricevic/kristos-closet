import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ImageUploader from './components/ImageUploader';
import ClosetView from './components/ClosetView';
import NavBar from './components/NavBar';
import SlideUpTab from './components/SlideUpTab';
import RegistrationModal from './components/RegistrationModal';
import LoginModal from './components/LoginModal';
import { RegistrationModalVisibility, LoginModalVisibility } from './features/modalSlice';

import './App.css';

  const App = () => {
    
  
    const isRegistrationModalVisible = useSelector(RegistrationModalVisibility);
    const isLoginModalVisible = useSelector(LoginModalVisibility);

    return (

      <div className="body-container">
        <div className="main-column-layout">

          <div class="navbar-container">
            <NavBar />
              {isRegistrationModalVisible && <RegistrationModal />}
              {isLoginModalVisible && <LoginModal />}
          </div>

          <div className="clothing-components-layout">
            <div className="closet-view-container">
              <ClosetView />
            </div>
            <div>
              <SlideUpTab />
            </div>
          </div>

        </div>
      </div>
  );
};

export default App;
