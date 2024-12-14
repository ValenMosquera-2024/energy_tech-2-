import React, { useState } from "react";
import './Calculadora.css';
const Calculadora = () => {
  const [consumption, setConsumption] = useState(0);

  const handleCalculate = () => {
    const savings = (consumption * 5.5 * 30) / 1000;
    return savings.toFixed(2);
  };

  const priceCalculate = () => {
    const savings = Math.round(((consumption * 5.5 * 30) / 1000) * 867.8);
    return Intl.NumberFormat('en-US').format(savings);
  };

  return (
    <div>
      <div>
        <label>
          Producción del sistema solar (kWh):
          <input
            type="number"
            value={consumption}
            onChange={(e) => setConsumption(e.target.value)}
          />
        </label>
      </div>
      <h2>Ahorro Estimado: {handleCalculate()} kWh</h2>
      <h2>Ahorro Estimado en COP: {priceCalculate()} Pesos</h2>
    </div>
  );
};

export default Calculadora;
