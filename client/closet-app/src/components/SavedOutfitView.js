import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectedItems, removeItem } from '../features/selectedItemsSlice';
import { outfit, createOutfit, deleteOutfit } from '../savedOutfitSlice';


const SavedOutfitView = () => {

    const savedOutfit = useSelector(outfit);
    // console.log("outfit", outfit);
    const dispatch = useDispatch();
    console.log("saved outfit log", savedOutfit);
     
    const handleRemoveItem = (item) => {
        //check to see if there is an item
        if (!item) 
            {
                alert('This is what it sounds like when doves cry :,(');
                return;            
            }

        dispatch(removeItem(item));
        console.log("Handle Remove Item", item);
    };

    return (
        <div className="outfit-view-container">
            <div className="outfit-view-main">
                {Object.entries(outfit).map(([category, item]) => (
                <div className="outfit-item-card" key={category} >
                    <div className="outfit-item-category-title">{category}</div>
                    {item ? (
                    <div className="outfit-image-wrapper">
                        <img class="outfit-image" src={item.imageUrl} alt={category} />
                    </div>
                    ) : (
                    <p>No {category} selected</p>
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
    
export default SavedOutfitView;