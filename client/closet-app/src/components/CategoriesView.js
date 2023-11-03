import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editingImage, setEditImage, closeEditModal } from '../features/editModalSlice';
import { fetchItems } from '../features/closetSlice';

const CategoriesView = ({categories}) => {
    const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    console.log("Categories, categories", categories);

    const handleCategoriesClick = () => {
        setIsCategoriesExpanded(!isCategoriesExpanded);
    }
    

  return (
    <div className="sticky-container">
        {isCategoriesExpanded ? (
            <div className="closet-small-column">
            <div className="category-buttons-container">
                <div>
                    <button> 
                        <img className="user-open-icon-open" src="https://raw.githubusercontent.com/kristo-baricevic/kristos-closet/wardrobe-branch/client/closet-app/src/icons/OnePiece.png" alt="category text" onClick={handleCategoriesClick} />
                    </button>
                </div>
                <button className="category-button" 
                    onClick={() => setSelectedCategory(null)}>
                        All
                </button>
                {categories.map(category => 
                    (
                        <div className="category-button-container">
                            <button key={category} className="category-button" onClick={() => setSelectedCategory(category)}>
                                {category}
                                <img className="user-open-icon-open" src={`./icons/${category}.png" alt="category text"`}/>
                            </button>
                        </div>
                    )
                )}
            </div>
        </div>
        ) : (
            <div>
                <button> 
                    <img className="user-open-icon-open" src="https://raw.githubusercontent.com/kristo-baricevic/kristos-closet/wardrobe-branch/client/closet-app/src/icons/OnePiece.png" onClick={handleCategoriesClick} />
                </button>
            </div>
        )}
        
    </div>
  );
};

export default CategoriesView;
