import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OutfitView from './OutfitView';
import { toggleTabStyle } from '../features/closetSlice';
import { selectedItems } from '../features/selectedItemsSlice';
import { handleSetOutfit, saveOutfitAsync, selectedOutfit } from '../features/savedOutfitSlice';
import { selectUser } from '../features/userSlice';

function SlideUpTab({item}) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const currentItems = useSelector(selectedItems);
  const [outfitHandler, setOutfitHandler] = useState();
  const outfit = useSelector(selectedOutfit);

  const toggleTab = () => {
    setIsOpen(!isOpen);
    console.log("selectedItemsData", currentItems);
    dispatch(toggleTabStyle());
  };

  const handleSaveOutfit = () => {
    if (!user) {
      alert("You need to sign in to do that!");
    };

    if (currentItems === null || currentItems === undefined) {
      alert("You haven't selected any items!");
    };

    setOutfitHandler(currentItems);
    dispatch(handleSetOutfit(outfitHandler));

    // Get the selected items from your state
    console.log("click handle save", outfitHandler);

      try {
         // Additional data needed for your outfit
        const outfitData = {
          name: 'Outfit1', 
          userId: user._id,
          clothingItems: currentItems,
        };

        console.log("outfitData check", outfitData);

        dispatch(saveOutfitAsync(outfitData)).then((response) => {
          console.log(response);
          })
        } catch (error) {
        console.log("there is an error!!!", error);
        alert("oh no! there was an error saving the outfit :(");
      }
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

export default React.memo(SlideUpTab);
