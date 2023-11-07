import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OutfitView from './OutfitView';
import { toggleTabStyle } from '../features/closetSlice';
import { selectedItems, removeItem } from '../features/selectedItemsSlice';
import { saveOutfitAsync, addItem } from '../features/savedOutfitSlice';
import { selectUser } from '../features/userSlice';
import { addToWardrobe } from '../features/wardrobeSlice';

function SlideUpTab({item}) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const selectedItemsData = useSelector(selectedItems);

  const toggleTab = () => {
    setIsOpen(!isOpen);
    dispatch(toggleTabStyle());
    console.log("toggle tab");
  };

  const handleSaveOutfit = (item) => {

    // Get the selected items from your state
    console.log("click");
    console.log(item);



    // Additional data needed for your outfit
    const outfitData = {
      name: 'Outfit1', 
      description: 'My first outfit',
      user: user,
      clothingItems: selectedItemsData,
      imageUrl: 'URL to image',
    };


    console.log("test the outfit", outfitData.clothingItems);
    console.log("test the outfit", selectedItemsData);

    // Create an outfit object that includes the selected items and other data
    dispatch(saveOutfitAsync(outfitData));
  };

  return (
    <div className={`slide-up-tab ${isOpen ? 'open' : ''}`}>
      <div className="tab-view-buttons-container">
      <button className="tab-button" onClick={toggleTab}>
        Selected Items View
      </button>
      <button className="save-outfit" onClick={handleSaveOutfit(item)}>
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
