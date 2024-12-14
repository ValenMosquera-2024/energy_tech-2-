

import React, { useState, useMemo } from "react";
import ColumnFilter from "./ColumnFilter";
import CountryFilter from "./CountryFilter";
import YearRangeFilter from "./YearRangeFilter";
import DataTable from "./DataTable";
import "./DataPage.css"; // Importando el CSS

const DataPage = React.memo(() => {
  const [jsonData, setJsonData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [yearRange, setYearRange] = useState([0, 0]);
  const [availableYears, setAvailableYears] = useState([0, 0]);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  const itemsPerPage = 6;

  React.useEffect(() => {
    fetch("/src/pages/Tabla_de_Datos.csv")
      .then((response) => response.text())
      .then((csvContent) => {
        const rows = csvContent.trim().split("\n");
        const headers = rows[0].split(",").map((header) => header.trim());
        const data = rows.slice(1).map((row) => {
          const values = row.split(",");
          return headers.reduce((acc, header, index) => {
            acc[header] = values[index]?.trim();
            return acc;
          }, {});
        });

        setHeaders(headers);
        setJsonData(data);
        setVisibleColumns(headers);

        const years = [...new Set(data.map((row) => parseInt(row["ano"])))].sort(
          (a, b) => a - b
        );
        setAvailableYears([years[0], years[years.length - 1]]);
        setYearRange([years[0], years[years.length - 1]]);
      });
  }, []);

  const handleApplyFilters = () => {
    if (yearRange[0] === yearRange[1]) {
      setErrorMessage(
        "El rango de años no puede ser igual. Por favor selecciona valores distintos."
      );
      return;
    }
    setErrorMessage("");
    setFiltersApplied(true);
    setCurrentPage(1);
  };

  const filteredData = useMemo(() => {
    if (!filtersApplied) return jsonData;

    return jsonData.filter((row) => {
      if (
        selectedCountries.length > 0 &&
        !selectedCountries.includes(row["entidad"])
      ) {
        return false;
      }

      const year = parseInt(row["ano"]);
      if (year < yearRange[0] || year > yearRange[1]) {
        return false;
      }

      return true;
    });
  }, [jsonData, selectedCountries, yearRange, filtersApplied]);

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const totalPages = useMemo(
    () => Math.ceil(filteredData.length / itemsPerPage),
    [filteredData.length]
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const uniqueCountries = useMemo(() => {
    return [...new Set(jsonData.map((row) => row["entidad"]))].filter(Boolean);
  }, [jsonData]);
  return (
    <div className="container">
      <div className="sidebar">
        <h2 className="title">Filtros</h2>

        {/* Grupo de filtro para columnas */}
        <div className="filter-group">
          <h3 className="title">Columnas a mostrar</h3>
          <ColumnFilter
            headers={headers}
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
          />
        </div>

        {/* Grupo de filtro para países */}
        <div className="filter-group">
          <h3 className="title">Filtrar por país</h3>
          <CountryFilter
            uniqueCountries={uniqueCountries}
            selectedCountries={selectedCountries}
            setSelectedCountries={setSelectedCountries}
          />
        </div>

        {/* Grupo de filtro para rango de años */}
        <div className="filter-group">
          <h3 className="title">Rango de años</h3>
          <YearRangeFilter
            yearRange={yearRange}
            availableYears={availableYears}
            setYearRange={setYearRange}
            handleApplyFilters={handleApplyFilters}
            errorMessage={errorMessage}
          />
        </div>
      </div>

      <div className="main-content">
        <DataTable
          visibleColumns={visibleColumns}
          currentItems={currentItems}
          currentPage={currentPage}
          totalPages={totalPages}
          goToNextPage={goToNextPage}
          goToPreviousPage={goToPreviousPage}
        />
      </div>
    </div>
  );
});

export default DataPage;
