import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../features/selectedItemsSlice.js'

const OutfitView = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const selectedItems = useSelector(state => state.selectedItems);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);

    // outfitView window resizing
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const removeSelectedItem = (item, category) => {
    dispatch(removeItem({ category, itemId: item.id }));
  };

  const filteredSelectedItems = Object.keys(selectedItems).reduce((acc, category) => {
    if (category !== "accessory") {
      acc[category] = selectedItems[category];
    }
    return acc;
  }, {});

  const getImageUrl = (imageData) => {
    if (!imageData) {
      console.error('Invalid image data:', imageData);
      return null;
    }

    return `data:${imageData.ContentType};base64,${imageData.imageData}`;
  };

  return (
    <div>
      {isDesktop ? (
        <div className="outfit-view-desktop">
          <div className="outfit-view-container-desktop">
            <div className="outfit-view">
              {Object.entries(filteredSelectedItems).map(([category, item]) => (
                <div key={category} className="item">
                  <div className="item-image-wrapper">
                    <img src={getImageUrl(item)} alt="Selected Item" />
                  </div>
                  <div className="item-info">
                    <div>{category}</div>
                    <button className="outfit-remove-button" onClick={() => removeSelectedItem(item, category)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="accessory-view">
              {selectedItems.accessory.length > 0 ? (
                <div className="accessories">
                  {selectedItems.accessory.map(accessory => (
                    <div key={accessory.id} className="item">
                      <div className="item-image-wrapper">
                        <img src={getImageUrl(accessory)} alt="Selected Accessory" />
                      </div>
                      <div className="item-info">
                        <div>Accessory</div>
                        <button onClick={() => removeSelectedItem(accessory, 'accessory')}>Remove</button>
                      </div>
                    </div>
                  ))}
                </div> */}
              {/* ) : (
                <div className="empty-message">No items selected</div>
              )}
            </div> */}
          </div>
        </div>
      ) : (
        <div className="outfit-view-mobile">
          <div className="outfit-view-container-mobile">
            <div className="outfit-view">
              {Object.entries(filteredSelectedItems).map(([category, item]) => (
                <div key={category} className="item">
                  <div className="item-image-wrapper">
                    <img src={getImageUrl(item)} alt="Selected Item" />
                  </div>
                  <div className="item-info">
                    <div>{category}</div>
                    <button className="outfit-remove-button" onClick={() => removeSelectedItem(item, category)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="accessory-view">
              {selectedItems.accessory.length > 0 ? (
                <div className="accessories">
                  {selectedItems.accessory.map(accessory => (
                    <div key={accessory.id} className="item">
                      <div className="item-image-wrapper">
                        <img src={getImageUrl(accessory)} alt="Selected Accessory" />
                      </div>
                      <div className="item-info">
                        <div>Accessory</div>
                        <button onClick={() => removeSelectedItem(accessory, 'accessory')}>Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-message">No items selected</div>
              )}
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default OutfitView;