import React from 'react';
import { useSelector } from 'react-redux';
import { selectedItems } from '../features/selectedItemsSlice';


const OutfitView = () => {

    const outfit = useSelector(selectedItems);
    console.log("outfit", outfit);

    return (
        <div className="outfit-view-container-desktop">
          <h2 className="outfit-title">Your Selected Outfit</h2>
            <div className="outfit-view">
                {Object.entries(outfit).map(([category, item]) => (
                <div key={category} className="outfit-item">
                    <h3>{category}</h3>
                    {item ? (
                    <div className="item-image-wrapper">
                        <img src={item.imageUrl} alt={category} />
                        <p>{item.name}</p>
                    </div>
                    ) : (
                    <p>No {category} selected</p>
                    )}
                </div>
                ))}
            </div>
        </div>
      );
      
};
    
export default OutfitView;