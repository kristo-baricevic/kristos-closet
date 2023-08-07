import React, { useState, useEffect } from 'react';

const PhotoStream = ({ isAuthenticated }) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editedCategory, setEditedCategory] = useState(null);
  const [editingImageId, setEditingImageId] = useState(null);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    fetchImages();
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const uniqueCategories = [...new Set(images.map(image => image.category))];

  const filteredImages = selectedCategory
    ? images.filter(image => image.category === selectedCategory)
    : images;

  const checkScreenSize = () => {
    setIsDesktop(window.innerWidth >= 768);
  };

  const openImage = (image) => {
    // Open the image when clicked
  };

  const getImageUrl = (imageData) => {
    try {
      if (!imageData) {
        console.error('Invalid image data:', imageData);
        return null;
      }

      const base64String = atob(imageData);
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

  const fetchImages = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await fetch('/backend/Images', { headers });
      const data = await response.json();

      const updatedImages = data.map((image) => ({
        ...image,
        isUserImage: image.userId !== null,
      }));
      setImages(updatedImages);
    } catch (error) {
      console.error('Failed to fetch images:', error);
    }
  };

  const deleteImage = async (image) => {
    if (!isAuthenticated) {
      alert('You must be logged in to delete items.');
      return;
    }

    if (!image.userId) {
      alert('You cannot delete shared items.');
      return;
    }

    try {
      const response = await fetch(`/backend/Images/${image.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchImages();
      } else {
        console.error('Failed to delete image:', image.id);
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleEditImage = (image) => {
    if (!isAuthenticated) {
      alert('You must be logged in to edit items.');
      return;
    }

    if (!image.userId) {
      alert('You cannot edit shared images.');
      return;
    }

    setEditingImageId(image.id);
    setEditedCategory(image.category);
  };

  const isUserClothingItem = async (imageId) => {
    try {
      const image = images.find((img) => img.id === imageId);
      return image && image.isUserImage;
    } catch (error) {
      console.error('Error checking if the image belongs to UserClothingItem:', error);
      return false;
    }
  };

  const isEditing = (image) => {
    return editingImageId === image.id && image.isUserImage;
  };

  const saveImageEdit = async (image) => {
    const updatedCategory = editedCategory.trim();
    if (updatedCategory !== "") {
      const foundImage = images.find((img) => img.id === image.id);
      if (foundImage) {
        foundImage.category = updatedCategory;
      }

      try {
        const response = await fetch(`/backend/Images/${image.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            category: updatedCategory,
          }),
        });

        if (response.ok) {
          const updatedImage = await response.json();
          foundImage.category = updatedImage.category;
        } else {
          console.error('Failed to update image category:', response);
        }
      } catch (error) {
        console.error('Error updating image category:', error);
      }
    }

    setEditingImageId(null);
    setEditedCategory("");
  };

  const cancelImageEdit = () => {
    setEditingImageId(null);
    setEditedCategory("");
  };

  const handleSelectImage = (image) => {
    // Emit the selected image to the parent component
    // this.$emit('selectImage', image);
    console.log('handleSelectImage connected:', image);
  };

  const filterByCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      {isDesktop ? (
        <div>
          {/* Desktop layout code */}
        </div>
      ) : (
        <div>
          {/* Mobile layout code */}
        </div>
      )}
    </div>
  );
};

export default PhotoStream;
