import React from 'react';
import { useSelector } from 'react-redux';
import { selectedItems } from '../features/selectedItemsSlice';


const OutfitView = () => {

    const outfit = useSelector(selectedItems);
    // console.log("outfit", outfit);

     
    const handleRemoveItem = (item) => {

        console.log("Handle Remove Item", item.id);

    };


    return (
        <div className="outfit-view-container">
          <h2 className="outfit-main-title">Your Outfit</h2>
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
    
export default OutfitView;