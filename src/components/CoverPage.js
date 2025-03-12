import React from "react";
import "./CoverPage.css";
import img1 from '../images/MoniCover.png';
import fileDownload from '../files/CV2024.pdf'; // Change to your actual file

const CoverPage = () => {
  return (
    <div className="cover-page">
      <div className="cover-column left-column">
        <div className="download-section">
          <p>Hi! My name is Monica, I’m a private, introvert, strong person, but also a very creative, sensitive and resilient human being. To learn more about my work and experience click here.</p>
          <a href={fileDownload} target="_blank" rel="noopener noreferrer" className="download-btn">
        CV
      </a>
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
