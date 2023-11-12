import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OutfitView from './OutfitView';
import { toggleTabStyle } from '../features/closetSlice';
import { selectedItems } from '../features/selectedItemsSlice';
import { saveOutfitAsync } from '../features/savedOutfitSlice';
import { selectUser } from '../features/userSlice';
import { addToWardrobeAsync } from '../features/wardrobeSlice';

function SlideUpTab({item}) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const outfit = useSelector(selectedItems);

  const toggleTab = () => {
    setIsOpen(!isOpen);
    console.log("selectedItemsData", outfit);
    dispatch(toggleTabStyle());
    console.log("toggle tab");
  };

  const handleSaveOutfit = () => {

    // Get the selected items from your state
    console.log("click handle save");
    console.log("item is", );

    // Additional data needed for your outfit
    const outfitData = {
      name: 'Outfit1', 
      description: 'My first outfit',
      user: user,
      clothingItems: outfit,
      imageUrl: 'URL to image',
    };

    console.log("test the outfit", outfitData.clothingItems);
    console.log("test the outfit", outfit);

    // Create an outfit object that includes the selected items and other data
    const result = dispatch(saveOutfitAsync(outfitData));
    console.log("end of save outfit", result);
  };

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
        <OutfitView item={item}/>
      </div>
    </div>
  );
}

export default SlideUpTab;
