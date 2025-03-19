import React from "react";
import "./CoverPage.css";
import img1 from '../images/MoniCover.png';
import CVFile from '../files/CV2024.pdf'; // Change to your actual file
import DesignFile from '../files/DESIGN2024.pdf'; // Change to your actual file

import instaIcon from '../instagram-icon.svg';



const CoverPage = () => {
  return (
    <div className="cover-page">
      <div className="cover-column left-column">
        <div className="download-section">
          <p>Hello! My name is Monica. I am an introvert and strong individual with a deep sense of creativity, sensitivity, and resilience. For more information regarding my professional experience and background, please click here.</p>
          <div className="buttons">
            <a href={CVFile} target="_blank" rel="noopener noreferrer" className="download-btn">
            CV
            </a>
            <a href={DesignFile} target="_blank" rel="noopener noreferrer" className="download-btn">
            DESIGN
            </a>
          </div>

          <div className = "contact-icons">
          <a href="https://www.instagram.com/momenticos.mx?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" >
              <img src={instaIcon} alt="Instagram" className="icon-class" />
          </a>
        </div>
          
        </div>

        
      </div>

      <div className="cover-column right-column">

        <div className="cover-content">
          <h1 className="cover-port">Port</h1>
          <h1 className="cover-folio">folio</h1>
        </div>
        
        <div className="photo-square">
          <img className="cover-photo" src={img1} alt="MoniCover" />
        </div>

      </div>
      
      
    </div>
  );
};

export default CoverPage;
