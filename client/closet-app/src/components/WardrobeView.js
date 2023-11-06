import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getWardrobe, removeFromWardrobe, addToWardrobe, selectedWardrobe } from '../features/wardrobeSlice';
import { selectUser } from '../features/userSlice';
import { fetchItems } from '../features/closetSlice';



const Wardrobe = () => {
  const wardrobe = useSelector(selectedWardrobe);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);


  useEffect(() => {
    console.log('useEffect is running');
    dispatch(getWardrobe(user));
    console.log(user);
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
    <h2 className="wardrobe-heading">My Wardrobe</h2>
    {wardrobe.map((outfit, index) => (
    <div 
      key={index} 
      className="wardrobe-view-body"
    >
      <li className="wardrobe-item-card-container" key={index}>
          <div className="wardrobe-item-card">
            <p classNAme="wardrobe-outfit-name">{outfit.description}</p>
            <ul className="wardrobe-list-container">
              {outfit.clothingItems.map((clothingItem, itemIndex) => (
                <div className="wardrobe-outfit-item-contanter">
                <li className="wardrobe-list-itemIndex" key={itemIndex}>
                  <p className="wardrobe-list-category">{clothingItem.category}</p>
                  <img src={clothingItem.category.imageUrl} alt="Clothing item" />
                </li>
                </div>
              ))}
            </ul>
            <button onClick={() => handleRemoveItem(outfit._id)}>Remove</button>
          </div>
        </li>
    </div>
  ))}
  </div>
  );
};


export default Wardrobe;
