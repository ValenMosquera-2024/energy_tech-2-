

import './GraficaPage.css';
import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import ColumnFilter from "../pages/ColumnFilter";
import CountryFilter from "../pages/CountryFilter";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./GraficaPage.css";

// Registrar los elementos de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

const GraficaPage = () => {
  const [jsonData, setJsonData] = useState([]); 
  const [columns, setColumns] = useState([]); 
  const [visibleColumns, setVisibleColumns] = useState([]); 
  const [selectedCountries, setSelectedCountries] = useState([]); 
  const [filteredData, setFilteredData] = useState([]); 
  const [yearRange, setYearRange] = useState([0, 0]); 
  const COLORS = [
    "#4CAF50",
    "#FF9800",
    "#03A9F4",
    "#9C27B0",
    "#FFC107",
    "#F44336",
  ];

  const loadCSVData = async () => {
    try {
      const response = await fetch("src/pages/energy_data.csv");
      const csvText = await response.text();
      const parsedData = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
      });

      const cleanedData = parsedData.data.map((row) =>
        Object.fromEntries(
          Object.entries(row).map(([key, value]) => [key.trim(), value.trim()])
        )
      );

      setJsonData(cleanedData);
      setColumns(Object.keys(cleanedData[0]));
      setVisibleColumns(Object.keys(cleanedData[0]));

      const years = [...new Set(cleanedData.map((row) => parseInt(row.year) || 0))];
      years.sort((a, b) => a - b);
      setYearRange([years[0], years[years.length - 1]]);
      setFilteredData(cleanedData);
    } catch (error) {
      console.error("Error al cargar el archivo CSV:", error);
    }
  };

  useEffect(() => {
    loadCSVData();
  }, []);

  const applyFilters = () => {
    const filtered = jsonData.filter((row) => {
      const year = parseInt(row.year) || 0;
      return (
        (!selectedCountries.length ||
          selectedCountries.includes(row.entity || "")) &&
        year >= yearRange[0] &&
        year <= yearRange[1]
      );
    });
    setFilteredData(filtered);
  };

  const generateBarChartData = () => ({
    labels: filteredData.map((row) => row.entity),
    datasets: visibleColumns
      .filter((col) => col.toLowerCase().includes("generation"))
      .map((col, index) => ({
        label: col,
        data: filteredData.map((row) => parseFloat(row[col]) || 0),
        backgroundColor: COLORS[index % COLORS.length],
      })),
  });

  const generatePieChartData = () => {
    const total = visibleColumns
      .filter((col) => col.toLowerCase().includes("electricity"))
      .map((col) =>
        filteredData.reduce((sum, row) => sum + (parseFloat(row[col]) || 0), 0)
      );

    return {
      labels: visibleColumns.filter((col) =>
        col.toLowerCase().includes("electricity")
      ),
      datasets: [
        {
          data: total,
          backgroundColor: COLORS.slice(0, total.length),
        },
      ],
    };
  };

  const generateLineChartData = () => ({
    labels: [...new Set(filteredData.map((row) => row.year))].sort(),
    datasets: visibleColumns
      .filter((col) => col.toLowerCase().includes("capacity"))
      .map((col, index) => ({
        label: col,
        data: filteredData
          .filter((row) => row[col])
          .map((row) => parseFloat(row[col]) || 0),
        borderColor: COLORS[index % COLORS.length],
        fill: false,
      })),
  });

  const generateAreaChartData = () => ({
    labels: [...new Set(filteredData.map((row) => row.year))].sort(),
    datasets: visibleColumns
      .filter((col) => col.toLowerCase().includes("energy"))
      .map((col, index) => ({
        label: col,
        data: filteredData
          .filter((row) => row[col])
          .map((row) => parseFloat(row[col]) || 0),
        backgroundColor: `${COLORS[index % COLORS.length]}80`, 
        borderColor: COLORS[index % COLORS.length],
        fill: true,
      })),
  });

  return (
    <div className="grafica-page">
      <h1 className="titulo">Dashboard</h1>

      <div className="contenedor">
        {/* Sección de filtros */}
        <div className="filtros">
  <h2 className="subtitulo">Filtros</h2>
  <ColumnFilter
    headers={columns}
    visibleColumns={visibleColumns}
    setVisibleColumns={setVisibleColumns}
  />
  <CountryFilter
    uniqueCountries={[...new Set(jsonData.map((row) => row.entity))]}
    selectedCountries={selectedCountries}
    setSelectedCountries={setSelectedCountries}
  />
  
  {/* Agregando el filtro para el rango de años */}
  <div className="rango-anios">
    <label className="etiqueta">Rango de Años:</label>
    <input
      type="number"
      className="campo"
      value={yearRange[0]}
      onChange={(e) =>
        setYearRange([parseInt(e.target.value) || 0, yearRange[1]])
      }
    />
    <input
      type="number"
      className="campo"
      value={yearRange[1]}
      onChange={(e) =>
        setYearRange([yearRange[0], parseInt(e.target.value) || 0])
      }
    />
  </div>
  
  <button onClick={applyFilters} className="boton-aplicar">Aplicar Filtros</button>
</div>

        
        {/* Sección de Gráficos */}
        <div className="graficos">
          <div className="grafico">
            <Bar data={generateBarChartData()} options={{ responsive: true }} />
          </div>
          <div className="grafico">
            <Pie data={generatePieChartData()} options={{ responsive: true }} />
          </div>
          <div className="grafico">
            <Line data={generateLineChartData()} options={{ responsive: true }} />
          </div>
          <div className="grafico">
            <Line data={generateAreaChartData()} options={{ responsive: true }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraficaPage;




