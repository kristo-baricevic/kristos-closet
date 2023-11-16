import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OutfitView from './OutfitView';
import { toggleTabStyle } from '../features/closetSlice';
import { selectedItems } from '../features/selectedItemsSlice';
import { saveOutfitAsync } from '../features/savedOutfitSlice';
import { selectUser } from '../features/userSlice';

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

    // Additional data needed for your outfit
    const outfitData = {
      name: 'Outfit1', 
      description: 'My first outfit',
      user: user,
      clothingItems: outfit,
      imageUrl: 'URL to image',
    };

     console.log('handleSaveOutfit called');

    if (!outfit || outfit.length === 0) {
      alert("oh no! you are trying to submit an empty outfit :(");
    } else {
      try {
        // Create an outfit object that includes the selected items and other data
        dispatch(saveOutfitAsync(outfitData)).then((response) => {

          })
        } catch (error) {
        console.log("there is an error!!!", error);
        alert("oh no! there was an error saving the outfit :(");
      }
    };
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
