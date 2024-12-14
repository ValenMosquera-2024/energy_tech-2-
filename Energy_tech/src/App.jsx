// Importamos las librerías y archivos necesarios.

import React, { useState } from 'react'; // Importa React y el hook useState.
import './App.css'; // Estilos globales de la aplicación.
import Header from './components/Navbar/Navbar'; // Importa el Header que acabamos de definir.

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DataPage from './pages/DataPage';
import HomePage from './pages/HomePage';
import GraficaPage from './pages/GraficaPage';

import Calculadora from './Calculadora';


function App() {
  // Estado para controlar si el tooltip del círculo está activo.
  const [isHovered, setIsHovered] = useState(false);
  // Estado para controlar si la ventana de diálogo está abierta.
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
    <Router>
      <div id='root'>
        <div className='Main-content'>
          <Routes>
            <Route path='/' element={<HomePage />}/>
            <Route path='/datos' element={<DataPage />}/>
            <Route path='/graficas' element={<GraficaPage />}/>
          </Routes>
        </div>
      </div>
    </Router>
      {/* Fondo de portada */}
      <div className="Portada"></div>

      {/* Header de la página */}
      <Header className='header' />
      

      {/* Círculo flotante que activa el tooltip y la ventana de diálogo */}
      <div
        className={`floating-circle ${isHovered ? "hovered" : ""}`} // Aplica la clase "hovered" si el mouse está sobre el círculo
        onMouseEnter={() => setIsHovered(true)} // Activa el tooltip al pasar el mouse.
        onMouseLeave={() => setIsHovered(false)} // Desactiva el tooltip al salir.
        onClick={() => setIsDialogOpen(true)} // Abre la ventana de diálogo al hacer clic.
      >
        {isHovered ? "Calculadora" : "+"} {/* Signo "+" que aparece en el círculo */}
      </div>



      {/* Ventana de diálogo que aparece al hacer clic en el círculo */}
      {isDialogOpen && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <h3>Encuesta</h3>
            

            <Calculadora />
            <button onClick={() => setIsDialogOpen(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
}

// Exporta el componente principal para que se use en index.js.
export default App;

