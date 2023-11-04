import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OutfitView from './OutfitView';
import { toggleTabStyle } from '../features/closetSlice';
import { selectedItems, removeItem } from '../features/selectedItemsSlice';
import { saveOutfitAsync } from '../features/savedOutfitSlice';
import { selectUser } from '../features/userSlice';

function SlideUpTab() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const selectedItemsData = useSelector(selectedItems);



  const toggleTab = () => {
    setIsOpen(!isOpen);
    dispatch(toggleTabStyle());
    console.log("toggle tab");
  };

  const handleSaveOutfit = () => {
    // Get the selected items from your state
    console.log("click");

    // Additional data needed for your outfit
    const outfitData = {
      user: user,
    };

    // Create an outfit object that includes the selected items and other data
    const outfit = {
      selectedItems: selectedItemsData,
      ...outfitData,
    };

    console.log(outfit)

    dispatch(saveOutfitAsync(outfit));
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
