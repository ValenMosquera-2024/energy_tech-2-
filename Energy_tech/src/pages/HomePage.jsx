import React from 'react';
import './HomePage.css';



const InfoBox = ({ title, description, className }) => (
  <div className={`info-box ${className}`}>
    <h2>{title}</h2>
    <p>{description}</p>
  </div>
);

const HomePage = () => {
  return (
    <div className="home-page">
      <h1 className='main-title'>Energías Renovables</h1>
      <h2 className='subtitle'>Descubre el Futuro Sostenible: Innovaciones y Beneficios de las Energías Renovables</h2>

      {/* Primer InfoBox con tamaño específico */}
      <div className="first-info-container">
        <InfoBox 
          title="Qué son las energías renovables" 
          description="Las energías renovables son fuentes de energía que se obtienen de recursos naturales que son inagotables o se reponen de manera constante en el tiempo. Son alternativas sostenibles a los combustibles fósiles tradicionales porque tienen un menor impacto ambiental, emiten menos gases de efecto invernadero y no se agotan con el uso."
          className="info-box-1"
        />
      </div>

      {/* Contenedor para los otros dos InfoBoxes */}
      <div className="other-info-container">
        <InfoBox 
          title="Ventajas" 
          description={
            <>
              <p>- Reducen las emisiones de gases de efecto invernadero.</p>
              <p>- Son inagotables y no dependen de recursos limitados.</p>
              <p>- Diversifican las fuentes de energía, lo que incrementa la seguridad energética.</p>
              <p>- Generan empleos verdes y fomentan la independencia energética.</p>
            </>
          }
        />
        <InfoBox 
          title="Desventajas" 
          description={
            <>
            <p>-Pueden depender de factores climáticos o geográficos (ejemplo: viento, sol).</p>
            <p>-Las instalaciones iniciales suelen ser costosas</p>
            <p>-Algunas tecnologías pueden afectar ecosistemas locales durante su implementación​</p>
            </>
          }
          className="info-box-3"
        />
      </div>
      <div className="box3">
        <InfoBox
        title="Energía Solar"
        description={
          <>
          <p className='info-subtitle'>Que es la energia Solar?</p>
          <p>La energía solar es una fuente renovable que aprovecha la radiación del sol para generar electricidad o calor. Se obtiene principalmente mediante paneles solares fotovoltaicos, que convierten la luz solar en energía eléctrica, y sistemas térmicos que generan calor para aplicaciones domésticas o industriales. Es una opción limpia y sostenible que ayuda a reducir las emisiones de gases de efecto invernadero.</p>
          </>
        }
        className="info-box-4"
        />
      </div>
      <div className="Conjunto2">
        <InfoBox
        title=""
        description=""
        className="info-box-5"
        />
        <InfoBox
       title=""
       description=""
       className="info-box-6"
       />
      </div>
    </div>
  );
};

export default HomePage;




