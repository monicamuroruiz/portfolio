import React, { useState, useRef, useEffect } from 'react';
import './ImageBeforeAfterWidget.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


const ImageBeforeAfterWidget = ({ imgBefore, imgAfter, aspectRatio }) => {
  const [linePosition, setLinePosition] = useState(50); // Line starts at 50%
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const updateLinePosition = (clientX) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    let newPosition = ((clientX - rect.left) / rect.width) * 100;

    newPosition = Math.max(0, Math.min(100, newPosition)); // Keep within bounds
    setLinePosition(newPosition);
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    updateLinePosition(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (isDragging.current) {
      updateLinePosition(e.clientX);
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Apply aspect ratio to the container dynamically
  useEffect(() => {
    if (containerRef.current && aspectRatio) {
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerWidth / aspectRatio;
      containerRef.current.style.height = `${containerHeight}px`;
    }
  }, [aspectRatio]);

  return (
    <div
      className="image-widget-container"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Background (After) 
      <img src={imgAfter} alt="After" className="image-widget-image" />*/}

      <div>
      <picture>

        <img
          src={imgAfter}
          alt="After"
          className="image-widget-image"
       
        />
           </picture>
        <div className="label after-label">After</div>
      </div >
      

      {/* Foreground (Before) with clip-path */}
      <div className="image-wrapper" style={{ clipPath: `inset(0 ${100 - linePosition}% 0 0)` }}>
        <picture>
       
          <img
          src={imgBefore}
          alt="Before"
          className="image-widget-image before-image"
          />

        </picture>
          

        <div className="label before-label">Before</div>
      </div >
      

      {/* Draggable Divider Line */}
      <div
        className="image-widget-divider"
        style={{ left: `${linePosition}%` }}
        onMouseDown={(e) => {
          isDragging.current = true;
          e.preventDefault(); // Prevents unwanted selection behavior
        }}
      >
        
        <div className="divider-handle">
          {/* Left Arrow */}
          <i className="left-arrow fas fa-angle-left arrow-left" style={{ fontSize: '22px', color: 'white' }}></i>

          {/* Right Arrow */}
          <i className="right-arrow fas fa-angle-right arrow-right" style={{ fontSize: '22px', color: 'white' }}></i>
        </div>
      </div>

      

      {/*<div className="label after-label">After</div>*/}
      
    </div>
  );
};

export default ImageBeforeAfterWidget;
