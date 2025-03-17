import React, { useState } from 'react';
import './Photography.css';

import imageBackground from '../images/image_background.jpg';
import img1 from '../images/photography/img1.jpg';
import img2 from '../images/photography/img2.jpg';
import img3 from '../images/photography/img3.jpg';
import img4 from '../images/photography/img4.jpg';
import img5 from '../images/photography/img5.jpg';
import img6 from '../images/photography/img6.jpg';
import img7 from '../images/photography/img7.jpg';
import img8 from '../images/photography/img8.jpg';
import img9 from '../images/photography/img9.jpg';
import img10 from '../images/photography/img10.jpg';
import img11 from '../images/photography/img11.jpg';
import img12 from '../images/photography/img12.jpg';
import img13 from '../images/photography/img13.jpg';
import img14 from '../images/photography/img14.jpg';
import img15 from '../images/photography/img15.jpg';
import img16 from '../images/photography/img16.jpg';
import img17 from '../images/photography/img17.jpg';
import img18 from '../images/photography/img18.jpg';
import img19 from '../images/photography/img19.jpg';
import img20 from '../images/photography/img20.jpg';
import img21 from '../images/photography/img21.jpg';

const Photography = () => {
  const images = [
    img21, img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
    img11, img12, img13, img14, img15, img16, img17, img18, img19, img20
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleImageClick = (index) => {
    setSelectedImage(images[index]);
    setActiveIndex(index);
  };

  return (
    <div id="photography" className="photography-container">
      <div className="content-area">
        {/* Main Displayed Image */}
        <div className="main-content">
          {selectedImage && <img src={selectedImage} alt="Selected" className="selected-image" />}
        </div>

        {/* Image Panel with Vertical Scroll */}
        <div className="side-panel">
          <div className="black-box">
            <div className="black-box-content">
              {images.map((image, index) => (
                <img 
                  key={index} 
                  src={image} 
                  alt={`carousel-img-${index}`} 
                  className={`carousel-image ${index === activeIndex ? "active-image" : ""}`} 
                  onClick={() => handleImageClick(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Photography;
