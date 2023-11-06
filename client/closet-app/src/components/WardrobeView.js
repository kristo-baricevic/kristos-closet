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
    <div>
      <h2>My Wardrobe</h2>
      {wardrobe.length > 0 ? (
        <ul>
          {wardrobe[0]?.clothingItems?.map((clothingItem, index) => (
            <li key={index}>
              <h3>{clothingItem.category}</h3>
              <p>{clothingItem.objectId}</p>
              <button onClick={() => handleRemoveItem(wardrobe[0]?.clothingItems[index]?.objectId)}>Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No outfits in your wardrobe.</p>
      )}
    </div>
  );
};


export default Wardrobe;
