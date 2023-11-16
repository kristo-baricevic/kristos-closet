import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectedItems } from '../features/selectedItemsSlice';
import { addToWardrobeAsync } from '../features/wardrobeSlice';

const SavedOutfitView = () => {
    const outfit = useSelector(selectedItems);

    // console.log("outfit", outfit);
    const dispatch = useDispatch();
 
    const handleAddToWardrobe = (outfit) => {
        if (!outfit)
            {
                alert('This is what it sounds like when doves cry :,(');
                return;            
            }

        dispatch(addToWardrobeAsync(outfit));
        console.log("Handle Add Wardrobe", outfit);
    }

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
                </div>
                ))}
                <div>
                    <button className="remove-saved-outfit-button" onClick={() => handleAddToWardrobe(outfit)}>Add to Wardrobe</button>
                </div>
            </div>
        </div>
    );
};
    
export default SavedOutfitView;