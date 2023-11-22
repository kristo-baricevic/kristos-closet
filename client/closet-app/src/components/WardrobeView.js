import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { fetchOutfits, userWardrobe } from '../features/wardrobeSlice';


const Wardrobe = () => {

  // const wardrobe = useSelector(selectedWardrobe);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userId = user?._id;
  const wardrobe = useSelector(userWardrobe);

  useEffect(() => {
    dispatch(fetchOutfits(userId));
  },[]);


  const handleDeleteOutfit = (outfitId) => {
    // Check to see if there is an outfitId
    if (!outfitId) {
      alert('This is what it sounds like when doves cry :,(');
      return;
    }
    // Dispatch the action to remove the outfit from the wardrobe
    // dispatch(removeFromWardrobe(outfitId));
  };

  const handleSelectOutfit = (outfitId) => {
    // Check to see if there is an outfitId
    if (!outfitId) {
      alert('This is what it sounds like when doves cry :,(');
      return;
    }
    // Dispatch the action to "put on" the outfit
  };

  return (
    <div className="wardrobe-view-main">
      <div className="wardrobe-heading">
        <h2 className="wardrobe-heading-text">My Wardrobe</h2>
      </div>
      <div className="wardrobe-container">

      {wardrobe && wardrobe.map((outfit) => (
          <div 
            key={outfit._id} 
            className="wardrobe-view-body"
          >
            <div className="wardrobe-item-card">
              <div className="wardrobe-card-solid-border">
                <p className="wardrobe-outfit-name">{outfit.description}</p>
                  <div className="wardrobe-ul-container">
                    <ul className="wardrobe-ul">
                      {outfit.clothingItems && outfit.clothingItems.map((clothingItem) => (
                        <div className="wardrobe-outfit-item-container" key={clothingItem?._id}>
                          <li className="wardrobe-list-itemIndex" key={clothingItem?._id}>
                            <p className="wardrobe-list-category">{clothingItem?.category}</p>
                            <img src={`https://kristobaricevic.com/api/images/${clothingItem?._id}`} alt="Clothing item" />
                          </li>
                        </div>
                      ))}
                    </ul>
                  </div>
                <div className="wardrobe-card-button-container">
                  <button className="wardrobe-button" onClick={() => handleDeleteOutfit(outfit._id)}>Delete</button>
                  <button className="wardrobe-button" onClick={() => handleSelectOutfit(outfit._id)}>Select</button>
                </div>
              </div> 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wardrobe;
