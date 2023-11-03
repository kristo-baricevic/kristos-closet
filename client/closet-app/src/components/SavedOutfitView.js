import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../features/selectedItemsSlice';

const SavedOutfitView = () => {
  const outfit = useSelector((state) => state.savedOutfit.outfits); // Assuming this is where your outfits are stored
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

  return (
    <div className="outfit-view-container">
      <h2>Saved Outfit</h2>
      <div className="outfit-view-main">
        {outfit.map((item) => (
          <div className="outfit-item-card" key={item._id}>
            <div className="outfit-item-category-title">{item.category}</div>
            <div className="outfit-image-wrapper">
              {item.imageUrl ? (
                <img className="outfit-image" src={item.imageUrl} alt={item.category} />
              ) : (
                <p>No {item.category} selected</p>
              )}
            </div>
            <div>
              <button className="remove-outfit-button" onClick={() => handleRemoveItem(item._id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="outfit-notes">
        <h3>Notes</h3>
        {/* Add a text area for notes here */}
      </div>
    </div>
  );
};

export default SavedOutfitView;
