import React, { useState, useEffect } from 'react';

const OutfitView = ({ selectedItems, removeItem }) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const filteredSelectedItems = Object.keys(selectedItems).reduce((acc, category) => {
    if (category !== "accessory") {
      acc[category] = selectedItems[category];
    }
    return acc;
  }, {});

  const getImageUrl = (imageData) => {
    try {
      if (!imageData) {
        console.error('Invalid image data:', imageData);
        return null;
      }

      const selectedImageData = imageData.data;
      const base64String = atob(selectedImageData);
      const bytes = new Uint8Array(base64String.length);

      for (let i = 0; i < base64String.length; i++) {
        bytes[i] = base64String.charCodeAt(i);
      }

      const blob = new Blob([bytes.buffer], { type: 'image/jpeg' });
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Error converting image data:', error);
      return null;
    }
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
                    <button className="outfit-remove-button" onClick={() => removeItem(item, category)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="accessory-view">
              {selectedItems.accessory.length > 0 ? (
                <div className="accessories">
                  {selectedItems.accessory.map(accessory => (
                    <div key={accessory.id} className="item">
                      <div className="item-image-wrapper">
                        <img src={getImageUrl(accessory)} alt="Selected Accessory" />
                      </div>
                      <div className="item-info">
                        <div>Accessory</div>
                        <button onClick={() => removeItem(accessory, 'accessory')}>Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-message">No items selected</div>
              )}
            </div>
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
                    <button className="outfit-remove-button" onClick={() => removeItem(item, category)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="accessory-view">
              {selectedItems.accessory.length > 0 ? (
                <div className="accessories">
                  {selectedItems.accessory.map(accessory => (
                    <div key={accessory.id} className="item">
                      <div className="item-image-wrapper">
                        <img src={getImageUrl(accessory)} alt="Selected Accessory" />
                      </div>
                      <div className="item-info">
                        <div>Accessory</div>
                        <button onClick={() => removeItem(accessory, 'accessory')}>Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-message">No items selected</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OutfitView;