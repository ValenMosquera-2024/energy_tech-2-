// src/components/Navbar/NavbarItem.jsx

import React from 'react';

const NavbarItem = ({ text, link }) => {
  return (
    <li className="navbar-item">
      <a href={link}>{text}</a>
    </li>
  );
};

export default NavbarItem;