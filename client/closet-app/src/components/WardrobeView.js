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
    <div>
    <h2>My Wardrobe</h2>
    {wardrobe.length > 0 ? (
      <ul>
        {wardrobe.map((outfit, index) => (
          <li key={index}>
            <h3>{outfit.name}</h3>
            <p>{outfit.description}</p>
            <button onClick={() => handleRemoveItem(outfit._id)}>Remove</button>
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
