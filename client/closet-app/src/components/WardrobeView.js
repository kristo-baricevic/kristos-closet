import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getWardrobe, addToWardrobe, removeFromWardrobe, selectedWardrobe } from '../features/wardrobeSlice';
import { selectUser } from '../features/userSlice';

const Wardrobe = () => {
  const wardrobe = useSelector(selectedWardrobe);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getWardrobe(user)).then((result) => {
      dispatch(addToWardrobe(result));
    });
  }, [user, dispatch]);
  
//the line below is a remove button i was using earlier
//<button onClick={() => handleRemoveItem(wardrobe[0]?.clothingItems[index]?.objectId)}>Remove</button>


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
                            <img src={clothingItem?.imageUrl} alt="Clothing item" />
                          </li>
                        </div>
                      ))}
                    </ul>
                  </div>
                <div className="wardrobe-card-button-container">
                  <button className="wardrobe-button" onClick={() => handleRemoveItem(outfit._id)}>Remove</button>
                  <button className="wardrobe-button" onClick={() => handleRemoveItem(outfit._id)}>Make Current Outfit</button>
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
