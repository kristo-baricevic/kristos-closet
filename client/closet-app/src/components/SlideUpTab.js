import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import OutfitView from './OutfitView';
import { toggleTabStyle } from '../features/closetSlice';
import { selectedItems, removeItem } from '../features/selectedItemsSlice';
import { saveOutfit } from '../features/savedOutfitSlice';



function SlideUpTab() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  

  const toggleTab = () => {
    setIsOpen(!isOpen);
    dispatch(toggleTabStyle());
    console.log("toggle tab");
  };

  const handleSaveOutfit = async (selectedItems, user) => {
    const dbFormData = new FormData();
    
    dbFormData.append('selectedItems', selectedItems);
    dbFormData.append('user', user);

    console.log("params before await in front", selectedItems, dbFormData);
    
    try{
      const res =  await dispatch(saveOutfit()); 
      console.log("after fetchItems", res);
    } catch (error) {
      console.error('Error uploading image:', error);
    }  }

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
