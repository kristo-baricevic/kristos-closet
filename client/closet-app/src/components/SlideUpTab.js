import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import OutfitView from './OutfitView';
import { toggleTabStyle } from '../features/closetSlice';

function SlideUpTab() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  

  const toggleTab = () => {
    setIsOpen(!isOpen);
    dispatch(toggleTabStyle());
    console.log("toggle tab");
  };

  const handleSaveOutfit = () => {
    // save the selected items as an "outfit"
  }

  return (
    <div className={`slide-up-tab ${isOpen ? 'open' : ''}`}>
      <div className="tab-view-buttons-container">
      <button className="tab-button" onClick={toggleTab}>
        Selected Items View
      </button>
      <button className="save-outfit" onClick={handleSaveOutfit}>
        Save Outfit
      </button>
      </div>
      <div className="tab-content">
        <OutfitView />
      </div>
    </div>
  );
}

export default SlideUpTab;
