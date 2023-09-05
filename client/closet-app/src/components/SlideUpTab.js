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

  return (
    <div className={`slide-up-tab ${isOpen ? 'open' : ''}`}>
      <button className="tab-button" onClick={toggleTab}>
        Toggle Outfit View
      </button>
      <div className="tab-content">
        <OutfitView />
      </div>
    </div>
  );
}

export default SlideUpTab;
