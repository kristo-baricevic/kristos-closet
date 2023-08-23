import React from 'react';
import { useSelector } from 'react-redux';
import { selectedItemsSliceReducer } from '../features/selectedItemsSlice';

const OutfitView = () => {
    const selectedItems = useSelector(selectedItemsSliceReducer);

    return (
        <div className="outfit-view-container-desktop">
            <h2>Your Selected Outfit</h2>
            <div className="outfit-view">
                {Object.entries(selectedItems).map(([category, item]) => (
                    <div key={category} className="item">
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