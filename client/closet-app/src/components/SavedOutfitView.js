// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { removeItem } from '../features/selectedItemsSlice';
// import { saveOutfit, selectedOutfit } from '../features/savedOutfitSlice';
// import { selectUser } from '../features/userSlice';

// const SavedOutfitView = () => {
//   const dispatch = useDispatch();
//   const currentOutfit = useSelector(selectedOutfit);
//   const user = useSelector(selectUser);

//   console.log("current outfit test", currentOutfit[0].name);

//   const handleRemoveItem = (item) => {
//     // Check to see if there is an item
//     if (!item) {
//       alert('This is what it sounds like when doves cry :,(');
//       return;
//     }
//     // Dispatch the action to remove the item from the outfit
//     dispatch(removeItem(item));
//   };

//   const handleSaveOutfit = async (selectedItems, user) => {
//     const dbFormData = new FormData();
    
//     dbFormData.append('selectedItems', selectedItems);
//     dbFormData.append('user', user);

//     console.log("params before await in front", selectedItems, dbFormData);
    
//     try{
//       const res = await dispatch(saveOutfit()); 
//       console.log("after fetchItems", res);
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     }  
//   }

//   return (
//     <div className="outfit-view-main">
//       {currentOutfit[0]?.clothingItems.map((clothingItem, clothingItemIndex) => (
//         <div className="outfit-view-main" key={clothingItemIndex}>
//           {Object.entries(clothingItem.items).map(([category, item], categoryIndex) => (
//             <div key={categoryIndex}>
//               <div className="outfit-item-card">{category}</div>
//               {item ? (
//                 <div className="outfit-image-wrapper">
//                   <img className="outfit-image" src={item.imageUrl} alt={category} />
//                   <div>
//                     <p>{item.name}</p>
//                   </div>
//                   <div>
//                     <button className="remove-outfit-button" onClick={() => handleRemoveItem(item)}>Remove</button>
//                   </div>
//                 </div>
//               ) : (
//                 <p>No {category} selected</p>
//               )}
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SavedOutfitView;


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