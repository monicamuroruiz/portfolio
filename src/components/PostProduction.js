import React, { useState, useEffect } from 'react';
import './PostProduction.css'; // Add styles in this file
import ImageBeforeAfterWidget from './ImageBeforeAfterWidget'; // Import the widget

// Function to dynamically import images from a folder
const importImages = (context) => context.keys().map(context);

const PostProduction = () => {
  // Import images from each category and organize them
  const colorCorrectionGood = importImages(require.context('../images/PostProduction/ColorCorrection/good_tiny', false, /\.(jpg|tif)$/));
  const colorCorrectionBad = importImages(require.context('../images/PostProduction/ColorCorrection/bad_tiny', false, /\.(jpg|tif)$/));
  const retouchPeopleGood = importImages(require.context('../images/PostProduction/RetouchPeople/good_tiny', false, /\.(jpg|tif)$/));
  const retouchPeopleBad = importImages(require.context('../images/PostProduction/RetouchPeople/bad_tiny', false, /\.(jpg|tif)$/));
  const removalsGood = importImages(require.context('../images/PostProduction/Removals/good_tiny', false, /\.(jpg|tif)$/));
  const removalsBad = importImages(require.context('../images/PostProduction/Removals/bad_tiny', false, /\.(jpg|tif)$/));

  // State to track the current category, image pair, and aspect ratio
  const [currentCategory, setCurrentCategory] = useState('ColorCorrection');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageAspectRatio, setImageAspectRatio] = useState(16 / 9); // Default aspect ratio
  const [allImages, setAllImages] = useState({}); // Store all preloaded images
  const [isImagesLoaded, setIsImagesLoaded] = useState(false); // Track image loading status
  const [isLoading, setIsLoading] = useState(true); // Track if the loading gif should be shown

  // Function to preload all images at once
  const preloadImages = async () => {
    const allImages = {};

    // Preload images for each category and store them
    const categories = {
      ColorCorrection: { good: colorCorrectionGood, bad: colorCorrectionBad },
      RetouchPeople: { good: retouchPeopleGood, bad: retouchPeopleBad },
      Removals: { good: removalsGood, bad: removalsBad },
    };

    const loadedImages = [];

    // Preload and store images
    Object.keys(categories).forEach((category) => {
      allImages[category] = categories[category].good.map((goodImg, index) => {
        const imgBefore = categories[category].bad[index];
        const imgAfter = goodImg;
        loadedImages.push(new Image());
        loadedImages[loadedImages.length - 1].src = imgBefore;
        loadedImages.push(new Image());
        loadedImages[loadedImages.length - 1].src = imgAfter;

        return { imgBefore, imgAfter };
      });
    });

    // Wait for all images to load
    await Promise.all(loadedImages.map((img) => new Promise((resolve) => img.onload = resolve)));

    setAllImages(allImages);
    setIsImagesLoaded(true);
    setIsLoading(false); // Set loading state to false after images are loaded
  };

  // Function to get aspect ratio of the selected image
  const getImageAspectRatio = (image) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        resolve(img.width / img.height);
      };
    });
  };

  // Function to update aspect ratio when category is changed
  const updateAspectRatio = async () => {
    if (allImages[currentCategory] && allImages[currentCategory].length > 0) {
      const selectedImage = allImages[currentCategory][currentIndex]?.imgBefore; // Use the current selected image
      const aspectRatio = await getImageAspectRatio(selectedImage);
      setImageAspectRatio(aspectRatio);
    }
  };

  // Handle category change and reset aspect ratio
  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    setCurrentIndex(0); // Reset to the first image
    updateAspectRatio(); // Update aspect ratio based on the first image of the new category
  };

  // Handle dot click and update aspect ratio for the selected image
  const handleDotClick = async (index) => {
    setCurrentIndex(index);
    const selectedImage = allImages[currentCategory][index]?.imgBefore; // Use either imgBefore or imgAfter
    const aspectRatio = await getImageAspectRatio(selectedImage);
    setImageAspectRatio(aspectRatio);
  };

  // Update aspect ratio when category or images change
  useEffect(() => {
    preloadImages(); // Preload images when component is mounted
  }, []);

  useEffect(() => {
    if (isImagesLoaded) {
      updateAspectRatio(); // Update the aspect ratio when images have loaded and category is changed
    }
  }, [currentCategory, currentIndex, isImagesLoaded]); // This ensures the aspect ratio is updated on category change or image index change

  return (
    <div className="post-production">
      {/* Category Headers */}
      <div className="categories">
        <h2
          className={currentCategory === 'ColorCorrection' ? 'active' : ''}
          onClick={() => handleCategoryChange('ColorCorrection')}
        >
          Color Correction
        </h2>
        <h2
          className={currentCategory === 'RetouchPeople' ? 'active' : ''}
          onClick={() => handleCategoryChange('RetouchPeople')}
        >
          Retouch People
        </h2>
        <h2
          className={currentCategory === 'Removals' ? 'active' : ''}
          onClick={() => handleCategoryChange('Removals')}
        >
          Removals
        </h2>
      </div>

      {/* Dots Navigation */}
      <div className="dots-container">
        {allImages[currentCategory]?.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)} // Add onClick handler for the dot
          ></div>
        ))}
      </div>

      {/* Loading GIF */}
      {isLoading ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        // Image Before/After Widget
        <div className="image-before-after-container">
          {allImages[currentCategory]?.length > 0 && (
            <ImageBeforeAfterWidget
              imgBefore={allImages[currentCategory][currentIndex]?.imgBefore}
              imgAfter={allImages[currentCategory][currentIndex]?.imgAfter}
              aspectRatio={imageAspectRatio} // Pass aspect ratio to widget
            />
          )}
        </div>
      )}
      <p  className='copyright-disclaimer'>Image source: Not owned by me.</p>
    </div>
  );
};

export default PostProduction;
