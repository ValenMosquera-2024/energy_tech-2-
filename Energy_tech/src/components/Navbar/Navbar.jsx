// Importamos las librerías y archivos necesarios.
import React from 'react'; // Importa React para construir componentes.
import './Navbar.css'; // Importa los estilos específicos del componente Navbar.
import NavbarLogo from './NavbarLogo'; // Componente que representa el logo del header.
import NavbarMenu from './NavbarMenu'; // Componente que representa el menú del header.

// Definimos el componente Header (antes Navbar).
const Header = () => {
  return (
    // El elemento <header> se usa por semántica para la parte superior de la página.
    <header className="navbar">
      {/* Componente que muestra el logo junto con su texto */}
      <NavbarLogo />

      {/* Componente que contiene la lista de enlaces del menú */}
      <NavbarMenu />
    </header>
  );
};

// Exportamos el componente para poder usarlo en otros archivos (como App.jsx).
export default Header;
