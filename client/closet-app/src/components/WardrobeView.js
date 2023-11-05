import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getWardrobe, removeFromWardrobe, selectedWardrobe } from '../features/wardrobeSlice';
import { selectUser } from '../features/userSlice';
import { fetchItems } from '../features/closetSlice';



const Wardrobe = () => {
  const wardrobe = useSelector(selectedWardrobe);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  
  useEffect(() => {
    console.log('useEffect is running');
    dispatch(getWardrobe(user));
  }, []);
  



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
      <ul>
        {wardrobe.map((outfit, index) => (
          <li key={index}>
            <h3>{outfit.name}</h3>
            <p>blank outfit</p>
            <button onClick={() => handleRemoveItem(outfit._id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wardrobe;
