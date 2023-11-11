import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectedItems, removeItem } from '../features/selectedItemsSlice';


const SavedOutfitView = () => {
    const outfit = useSelector(selectedItems);

    // console.log("outfit", outfit);
    const dispatch = useDispatch();
     
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
        <div className="saved-outfit-view-container">
            <div className="saved-outfit-view-main">
                {Object.entries(outfit).map(([category, item]) => (
                <div className="saved-outfit-item-card" key={category} >
                    <div className="saved-outfit-item-category-title">{category}</div>
                    {item ? (
                    <div className="saved-outfit-image-wrapper">
                        <img class="saved-outfit-image" src={item.imageUrl} alt={category} />
                    </div>
                    ) : (
                    <p>No {category} selected</p>
                    )}
                    <div>
                        <button class="remove-saved-outfit-button" onClick={() => handleRemoveItem(item)}>Remove</button>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
};
    
export default SavedOutfitView;