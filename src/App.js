import React, { useState } from 'react';
import './App.css';

import NavMenu from './components/NavMenu';
import CoverPage from './components/CoverPage';
import Architecture from './components/Architecture';
import PostProduction from './components/PostProduction';
import Design from './components/Design';
import Photography from './components/Photography';

const App = () => {
  const [activeComponent, setActiveComponent] = useState('CoverPage');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Architecture':
        return <Architecture />;
      case 'PostProduction':
        return <PostProduction />;
      case 'Design':
        return <Design />;
      case 'Photography':
        return <Photography />;
      default:
        return <CoverPage />;
    }
  };

  return (
    <div className="app-containers">
      <NavMenu activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      {renderComponent()}
    </div>
  );
};

export default App;
