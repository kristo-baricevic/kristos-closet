import { React } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ClosetView from './components/ClosetView';
import NavBar from './components/NavBar';
import SlideUpTab from './components/SlideUpTab';
import RegistrationModal from './components/RegistrationModal';
import LoginModal from './components/LoginModal';
import PreviewModal from './components/PreviewModal';
import { uploadPreviewVisibility } from './features/previewModalSlice';
import { RegistrationModalVisibility, LoginModalVisibility } from './features/modalSlice';
import SavedOutfitView from './components/SavedOutfitView'; // 
import WardrobeView from './components/WardrobeView';
import './App.css';

  const App = () => {
  
    const isPreviewVisible = useSelector(uploadPreviewVisibility);
    const isRegistrationModalVisible = useSelector(RegistrationModalVisibility);
    const isLoginModalVisible = useSelector(LoginModalVisibility);

    return (
      <Router>
        <div className="main-column-layout">
          <div className="navbar-container">
            <NavBar />
              {isRegistrationModalVisible && <RegistrationModal />}
              {isLoginModalVisible && <LoginModal />}
              {isPreviewVisible && <PreviewModal />}
          </div>
          <Routes>
            <Route path="/outfit-view" element={<SavedOutfitView />} /> 
            <Route path="/wardrobe" element={<WardrobeView />} /> 
            <Route exact path="/" element={<ClosetView />} />
          </Routes>
          <SlideUpTab />
        </div>
      </Router>
  );
};

export default App;
