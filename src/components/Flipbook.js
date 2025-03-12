import React, { useState, useEffect } from "react";
import "./Flipbook.css";

const Flipbook = ({ images }) => {
  const [currentLocation, setCurrentLocation] = useState(1);
  const numOfPapers = images.length / 2; // Each page consists of front & back
  const maxLocation = numOfPapers + 1;

  // Function to update z-index dynamically based on the flipped state
  const updateZIndex = () => {
    const book = document.querySelector("#book");
    if (!book) return;

    const papers = Array.from(book.getElementsByClassName("paper"));
    let firstNonFlipped = null;
    let secondNonFlipped = null;
    let lastFlipped = null;

    papers.forEach((paper, index) => {
      // Find the first non-flipped paper and set z-index 99
      if (!paper.classList.contains("flipped") && !firstNonFlipped) {
        firstNonFlipped = paper;
        paper.style.zIndex = 99;
      }
      // Find the next non-flipped paper and set z-index 98
      else if (!paper.classList.contains("flipped") && firstNonFlipped && !secondNonFlipped) {
        secondNonFlipped = paper;
        paper.style.zIndex = 98;
      } else {
        paper.style.zIndex = 1; // Set z-index 1 for all other pages
      }

      // Find all flipped papers and store the last one
      if (paper.classList.contains("flipped")) {
        lastFlipped = paper;
      }
    });

    // If there are flipped elements, set z-index 99 to the last flipped element
    if (lastFlipped) {
      lastFlipped.style.zIndex = 99;
    }
  };

  useEffect(() => {
    // Update z-index when the component renders
    updateZIndex();
  }, []);

  const openBook = () => {
    document.querySelector(".book").style.transform = "translateX(50%)";
  };

  const closeBook = (isAtBeginning) => {
    if (isAtBeginning) {
      document.querySelector(".book").style.transform = "translateX(0%)";
    } else {
      document.querySelector(".book").style.transform = "translateX(100%)";
    }
  };

  const goNextPage = () => {
    if (currentLocation < maxLocation) {
      const paper = document.querySelector(`#p${currentLocation}`);
      if (paper) {
        paper.classList.add("flipped");
      }

      // Update z-index after flipping the page
      updateZIndex();

      if (currentLocation === 1) openBook();
      if (currentLocation === numOfPapers) closeBook(false);

      setCurrentLocation((prev) => prev + 1);
    }
  };

  const goPrevPage = () => {
    if (currentLocation > 1) {
      const paper = document.querySelector(`#p${currentLocation - 1}`);
      if (paper) {
        paper.classList.remove("flipped");
      }

      // Update z-index after un-flipping the page
      updateZIndex();

      if (currentLocation === 2) closeBook(true);
      if (currentLocation === numOfPapers + 1) openBook();

      setCurrentLocation((prev) => prev - 1);
    }
  };

  return (
    <div className="flipbook-container">
      {/* Book */}
      <div id="book" className="book">
        {Array.from({ length: numOfPapers }, (_, i) => (
          <div key={i} id={`p${i + 1}`} className="paper">
            <div className="front box-3d">
              <div className="front-content">
                <img src={images[i * 2]} alt={`Front ${i + 1}`} />
              </div>
            </div>
            <div className="back box-3d">
              <div className="back-content">
                <img src={images[i * 2 + 1]} alt={`Back ${i + 1}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="nav-buttons">
        <button id="prev-btn" onClick={goPrevPage}>
          ◀
        </button>
        <button id="next-btn" onClick={goNextPage}>
          ▶
        </button>
      </div>
    </div>
  );
};

export default Flipbook;
