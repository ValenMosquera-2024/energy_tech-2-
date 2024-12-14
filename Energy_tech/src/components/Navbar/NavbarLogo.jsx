// src/components/Navbar/NavbarLogo.jsx

import React from 'react';

const NavbarLogo = () => {
  return (
    <div className="navbar-logo" style={styles.navbarLogo}>
      <img 
        src="/src/assets/logo.svg" 
        alt="Logo"
        style={styles.logo} 
      /> {/* Logo SVG */}
      <span>Energy Tech</span> {/* Texto al lado del logo */}
    </div>
  );
};

// Estilos en línea
const styles = {
  navbarLogo: {
    display: 'flex', // Alineación en línea (logo + texto)
    alignItems: 'center', // Alineación vertical centrada
    fontSize: '30px', // Tamaño del texto
    fontWeight: 'bold', // Texto en negrita
    color: '#333', // Color del texto
    paddingLeft: '10px', // Separación izquierda del contenedor
  },
  logo: {
    width: '200px', // Tamaño del logo (ajústalo según sea necesario)
    height: '150px',
    marginRight: '5px', // Espaciado entre el logo y el texto
  },
};

export default NavbarLogo;
