import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWardrobe } from '../features/wardrobeSlice';

const Wardrobe = () => {
  const wardrobe = useSelector((state) => state.wardrobe.wardrobe); // Assuming this is where your wardrobe outfits are stored
  const dispatch = useDispatch();

  const handleRemoveItem = (outfitId) => {
    // Check to see if there is an outfit
    if (!outfitId) {
      alert('This is what it sounds like when doves cry :,(');
      return;
    }
    // Dispatch the action to remove the outfit from the wardrobe
    dispatch(removeFromWardrobe(outfitId));
  };

  return (
    <div className="wardrobe-view-container">
      <h2>Wardrobe</h2>
      <div className="wardrobe-view-main">
        {wardrobe.map((outfit) => (
          <div className="outfit-item-card" key={outfit._id}>
            <div className="outfit-item-category-title">{outfit.name}</div>
            <div className="outfit-image-wrapper">
              {outfit.imageUrl ? (
                <img className="outfit-image" src={outfit.imageUrl} alt={outfit.name} />
              ) : (
                <p>No {outfit.name} selected</p>
              )}
            </div>
            <div>
              <button className="remove-outfit-button" onClick={() => handleRemoveItem(outfit._id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wardrobe;
