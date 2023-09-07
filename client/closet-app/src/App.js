import { React } from 'react';
import { useSelector } from 'react-redux';
import ClosetView from './components/ClosetView';
import NavBar from './components/NavBar';
import SlideUpTab from './components/SlideUpTab';
import RegistrationModal from './components/RegistrationModal';
import LoginModal from './components/LoginModal';
import PreviewModal from './components/PreviewModal';
import { uploadPreviewVisibility } from './features/previewModalSlice';
import { RegistrationModalVisibility, LoginModalVisibility } from './features/modalSlice';
import './App.css';

  const App = () => {
  
    const isPreviewVisible = useSelector(uploadPreviewVisibility);
    const isRegistrationModalVisible = useSelector(RegistrationModalVisibility);
    const isLoginModalVisible = useSelector(LoginModalVisibility);


 

    return (

        <div className="main-column-layout">

          <div class="navbar-container">
            <NavBar />
              {isRegistrationModalVisible && <RegistrationModal />}
              {isLoginModalVisible && <LoginModal />}
              {isPreviewVisible && <PreviewModal />}
              
          </div>

            <div className="closet-view-container">
              <ClosetView />
            </div>
          <SlideUpTab />
        </div>
  );
};

export default App;
