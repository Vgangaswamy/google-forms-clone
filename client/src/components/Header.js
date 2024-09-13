import React, { useState } from 'react';
import './Header.css'; 
import logoImg from './image2.png'; // Importing the image


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    window.location.href = '/signin'; 
  };

  return (
    <header className="header">
      <div className="logo">
        {/* Insert your image here */}
        <img src={logoImg} alt="Logo" className="logo-img" /> {/* Using the imported image */}
        Forms
      </div>
      <div className="hamburger-menu" onClick={toggleMenu}>
        ☰
      </div>

      {isMenuOpen && (
        <div className="dropdown-menu">
          <div className="user-profile">
            <img src="/path-to-profile-pic.jpg" alt="User Profile" />
            <span>John Doe</span>
          </div>
          <ul>
            <li>Profile</li>
            <li>Settings</li>
            <li onClick={handleSignOut}>Sign Out</li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
