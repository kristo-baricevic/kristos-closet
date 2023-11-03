import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editingImage, setEditImage, closeEditModal } from '../features/editModalSlice';
import { fetchItems } from '../features/closetSlice';

const CategoriesView = ({categories}) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    console.log("Categories, categories", categories);
    

  return (
    <div className="sticky-container">
        <div className="closet-small-column">
            <div className="category-buttons-container">
                <button className="category-button" 
                    onClick={() => setSelectedCategory(null)}>
                        All
                </button>
                {categories.map(category => 
                    (
                        <div className="category-button-container">
                            <button key={category} className="category-button" onClick={() => setSelectedCategory(category)}>
                                {category}
                                <img src={`./icons/${category}.png" alt="category text"`}/>
                            </button>
                        </div>
                    )
                )}
            </div>
        </div>
    </div>
  );
};

export default CategoriesView;
