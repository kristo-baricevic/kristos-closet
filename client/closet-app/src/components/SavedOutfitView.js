import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, selectedItems } from '../features/selectedItemsSlice';
import { selectedOutfit, saveOutfit } from '../features/savedOutfitSlice';
import { selectUser } from '../features/userSlice';

const SavedOutfitView = () => {
  const dispatch = useDispatch();
  const currentOutfit = useSelector(selectedOutfit);
  const user = useSelector(selectUser);


  console.log("current outfit test", currentOutfit[0].name);

  const handleRemoveItem = (itemId) => {
    // Check to see if there is an item
    if (!itemId) {
      alert('This is what it sounds like when doves cry :,(');
      return;
    }
    // Dispatch the action to remove the item from the outfit
    dispatch(removeItem(itemId));
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
    }  
  }

  return (
    <div className="outfit-view-container">
      <h2>Saved Outfit</h2>
  
      <div className="outfit-view-main">
        {currentOutfit.map((outfit, index) => (
          <div className="outfit-item-card" key={index}>
            <div className="outfit-item-category-title">{outfit.selectedItems?.category}</div>
            {outfit ? (
              <div className="outfit-image-wrapper">
                <img className="outfit-image" src={outfit.imageUrl} alt={outfit.selectedItems?.category} />
                <div>
                  <p>{outfit.name}</p>
                </div>
              </div>
            ) : (
              <p>No {outfit.selectedItems?.category} selected</p>
            )}
            <div>
              <button className="remove-outfit-button" onClick={() => handleRemoveItem(index)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
  
      <button className="save-outfit" onClick={() => handleSaveOutfit(currentOutfit, user)}>
        Save Outfit
      </button>
    </div>
  );
};

export default SavedOutfitView;
