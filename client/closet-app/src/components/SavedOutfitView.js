import React from 'react';
import { useDispatch } from 'react-redux';
import { removeItem, selectedItems } from '../features/selectedItemsSlice';
import { saveOutfit } from '../features/savedOutfitSlice';

const SavedOutfitView = () => {
  const dispatch = useDispatch();

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
        
      <div className="outfit-view-container">
            <div className="outfit-view-main">
                {Object.entries(selectedItems).map(([category, item]) => (
                <div className="outfit-item-card" key={category} >
                    <div className="outfit-item-category-title">{category}</div>
                    {item ? (
                    <div className="outfit-image-wrapper">
                        <img class="outfit-image" src={item.imageUrl} alt={category} />
                    </div>
                    ) : (
                    <p>No {category} selected</p>
                    )}
                    <div>
                        <button class="remove-outfit-button" onClick={() => handleRemoveItem(item)}>Remove</button>
                    </div>
                </div>
                ))}
            </div>
        </div>

        <button className="save-outfit" onClick={handleSaveOutfit}>
          Save Outfit
        </button>
      </div>
      

  );
};

export default SavedOutfitView;
