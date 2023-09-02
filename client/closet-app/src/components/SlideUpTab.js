import React, { useState } from 'react';
import OutfitView from './OutfitView';

function SlideUpTab() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleTab = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`slide-up-tab ${isOpen ? 'open' : ''}`}>
      <button className="tab-button" onClick={toggleTab}>
        Toggle Tab
      </button>
      <div className="tab-content">
        <OutfitView />
      </div>
    </div>
  );
}

export default SlideUpTab;
