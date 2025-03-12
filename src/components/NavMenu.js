import React from 'react';
import './NavMenu.css';

const NavMenu = ({ activeComponent, setActiveComponent }) => {
  const menuItems = [
    { label: 'Monica Muro', id: 'name', component: 'CoverPage' },
    { label: 'Architecture', id: 'architecture', component: 'Architecture' },
    { label: 'Post Production', id: 'post-production', component: 'PostProduction' },
    { label: 'Design', id: 'design', component: 'Design' },
    { label: 'Photography', id: 'photography', component: 'Photography' },
  ];

  /*,*/

  return (
    <nav className="nav-menu">
      <ul className="nav-links">
        {menuItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={item.component === activeComponent ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                if (item.component) setActiveComponent(item.component);
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavMenu;
