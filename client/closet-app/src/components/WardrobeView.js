import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectedItems, removeItem } from '../features/selectedItemsSlice';
import { outfit, addToWardrobe, removeFromWardrobe } from '../savedOutfitSlice';


const Wardrobe = () => {

    const savedOutfit = useSelector(outfit);
    // console.log("outfit", outfit);
    const dispatch = useDispatch();
    console.log("saved outfit log", addToWardrobe);
     
    const handleRemoveItem = (item) => {
        //check to see if there is an item
        if (!item) 
            {
                alert('This is what it sounds like when doves cry :,(');
                return;            
            }

        dispatch(removeFromWardrobe(item));
        console.log("Handle Remove Item", item);
    };

    return (
        <div className="outfit-view-container">
            <div className="outfit-view-main">
                {Wardrobe.entries(outfit).map(([wardrobe, outfit]) => (
                <div className="outfit-item-card" key={outfit} >
                    <div className="outfit-item-category-title">{outfit.name}</div>
                    {outfit ? (
                    <div className="outfit-image-wrapper">
                        <img class="outfit-image" src={item.imageUrl} alt={category} />
                    </div>
                    ) : (
                    <p>No {outfit} selected</p>
                    )}
                    <div>
                        <button class="remove-outfit-button" onClick={() => handleRemoveItem(item)}>Remove</button>
                    </div>
                </div>
                ))}
            </div>
        </div>
      );
      
};
    
export default Wardrobe;