import React, { useState, useEffect } from 'react';
import './Design.css';
import ImageBeforeAfterWidget from './ImageBeforeAfterWidget';

import des_good1 from '../images/Design/good/des_good1.jpg';
import des_good2 from '../images/Design/good/des_good2.jpg';
import des_good3 from '../images/Design/good/des_good3.jpg';
import des_bad1 from '../images/Design/bad/des_bad1.jpg';
import des_bad2 from '../images/Design/bad/des_bad2.jpg';
import des_bad3 from '../images/Design/bad/des_bad3.jpg';

const Design = () => {
  const designGood = [des_good1, des_good2, des_good3];
  const designBad = [des_bad1, des_bad2, des_bad3];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageAspectRatio, setImageAspectRatio] = useState(16 / 9);
  const [isLoading, setIsLoading] = useState(true);

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const loadedImages = [];

      designGood.forEach((goodImg, index) => {
        const badImg = designBad[index];
        loadedImages.push(new Image());
        loadedImages[loadedImages.length - 1].src = goodImg;
        loadedImages.push(new Image());
        loadedImages[loadedImages.length - 1].src = badImg;
      });

      await Promise.all(
        loadedImages.map((img) => new Promise((resolve) => (img.onload = resolve)))
      );

      setIsLoading(false);
    };

    preloadImages();
  }, []); // ✅ Only run on mount

  // Update aspect ratio when currentIndex changes
  useEffect(() => {
    const updateAspectRatio = async () => {
      const aspectRatio = await getImageAspectRatio(designBad[currentIndex]);
      setImageAspectRatio(aspectRatio);
    };

    updateAspectRatio();
  }, [currentIndex]); // ✅ Trigger on currentIndex change

  // Get image aspect ratio
  const getImageAspectRatio = (image) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        resolve(img.width / img.height);
      };
    });
  };

  // Handle dot click
  const handleDotClick = (index) => {
    setCurrentIndex(index); // ✅ This will trigger rerender due to updated dependency in useEffect
  };

  return (
    <div className="design">
      {/* Dots Navigation */}
      <div className="dots-container">
        {designGood.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </div>

      {/* Loading GIF */}
      {isLoading ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="image-before-after-container">
          {designGood.length > 0 && (
            <ImageBeforeAfterWidget
              imgBefore={designBad[currentIndex]}
              imgAfter={designGood[currentIndex]}
              aspectRatio={imageAspectRatio}
            />
          )}
        </div>
      )}
      <p className='copyright-disclaimer'>Image source: Not owned by me.</p>
    </div>
  );
};

export default Design;
