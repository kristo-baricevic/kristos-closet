import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getWardrobe, removeFromWardrobe, addToWardrobe, selectedWardrobe } from '../features/wardrobeSlice';
import { selectUser } from '../features/userSlice';

const Wardrobe = () => {
  const wardrobe = useSelector(selectedWardrobe);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    console.log('useEffect is running');
    dispatch(getWardrobe(user));
    console.log(wardrobe);
  }, [user]);
  
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
        {wardrobe.map((outfit, index) => (
          <div 
            key={index} 
            className="wardrobe-view-body"
          >
              <div className="wardrobe-item-card">
                <p className="wardrobe-outfit-name">{outfit.description}</p>
                  <div className="wardrobe-ul-container">
                    <ul className="wardrobe-ul">
                      {outfit.clothingItems.map((clothingItem, itemIndex) => (
                        <div className="wardrobe-outfit-item-container" key={itemIndex}>
                          <li className="wardrobe-list-itemIndex" key={itemIndex}>
                            <p className="wardrobe-list-category">{clothingItem.category}</p>
                            <img src={clothingItem.imageUrl} alt="Clothing item" />
                          </li>
                        </div>
                      ))}
                    </ul>
                  </div>
                <button className="navbar-button" onClick={() => handleRemoveItem(outfit._id)}>Remove From Wardrobe</button>
                <button className="navbar-button" onClick={() => handleRemoveItem(outfit._id)}>Make Current Outfit</button>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Wardrobe;
