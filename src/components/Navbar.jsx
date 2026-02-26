import React, { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`navbar-width ${isOpen ? 'nav-open' : ''}`}>
      {/* Mobile Menu Toggle Button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        {/* ABOUT */}
        <li className="nav-item">
          <a href="#about" className="nav-link" onClick={() => setIsOpen(false)}>
            <span className="bg-slide"></span>
            <span className="text-container">
              <span className="text default">About</span>
              <span className="text hover-text">About</span>
            </span>
          </a>
        </li>

        {/* OUR FLEET */}
        <li className="nav-item">
          <a href="#fleet" className="nav-link" onClick={() => setIsOpen(false)}>
            <span className="bg-slide"></span>
            <span className="text-container">
              <span className="text default">Our Fleet</span>
              <span className="text hover-text">Our Fleet</span>
            </span>
          </a>
        </li>

        {/* ADVANTAGES */}
        <li className="nav-item">
          <a href="#advantages" className="nav-link" onClick={() => setIsOpen(false)}>
            <span className="bg-slide"></span>
            <span className="text-container">
              <span className="text default">Advantages</span>
              <span className="text hover-text">Advantages</span>
            </span>
          </a>
        </li>

        {/* GLOBAL */}
        <li className="nav-item">
          <a href="#global" className="nav-link" onClick={() => setIsOpen(false)}>
            <span className="bg-slide"></span>
            <span className="text-container">
              <span className="text default">Global</span>
              <span className="text hover-text">Global</span>
            </span>
          </a>
        </li>
      </ul>

      <div className="jets-placeholder">Jesko Jets</div>

      {/* CONTACT SECTION */}
      <ul className={`contact-links ${isOpen ? 'open' : ''}`}>
        <li>
          <a href="tel:+971544325050" className="contact-link">
            +971 54 432 5050
          </a>
        </li>
        <li>
          <a href="mailto:info@jeskojets.com" className="contact-link">
            info@jeskojets.com
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;