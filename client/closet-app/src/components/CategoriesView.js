import React, { useState } from 'react';

const CategoriesView = ({categories, onCategorySelect}) => {
    const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    console.log("Categories, categories", categories);
    console.log("Categories, Selected categories", selectedCategory);


    const handleCategoriesClick = () => {
        setIsCategoriesExpanded(!isCategoriesExpanded);
    }
    

  return (
    <div className="sticky-container">
        {isCategoriesExpanded ? (
            <div className="closet-small-column">
            <div className="category-buttons-container">
                <div>
                    <button className="closet-categories-button"> 
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
                            <button key={category} className="category-button" 
                                onClick={() => {
                                    setSelectedCategory(category);
                                    onCategorySelect(category);
                                }}
                            >
                                {category}
                                <img className="user-open-icon-open" src={`./icons/${category}.png`} alt="category text"/>
                            </button>
                        </div>
                    )
                )}
            </div>
        </div>
        ) : (
            <div>
                <button className="closet-categories-button"> 
                    <img className="user-open-icon-open" src="https://raw.githubusercontent.com/kristo-baricevic/kristos-closet/wardrobe-branch/client/closet-app/src/icons/OnePiece.png" onClick={handleCategoriesClick} />
                </button>
            </div>
        )}
        
    </div>
  );
};

export default CategoriesView;
