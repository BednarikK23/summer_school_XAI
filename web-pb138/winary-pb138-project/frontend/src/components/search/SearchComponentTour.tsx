import React, { useState } from 'react';
import "./searchComponent.css";
import {FiltersTour, regions, sorts } from "./constantsFilters";
import Button from "../buttons/Button.tsx";
import {useNavigate} from "react-router-dom";


interface SearchComponentProps {
  query: string;
  setQuery: (query: string) => void;
  setFilters: React.Dispatch<React.SetStateAction<FiltersTour>>;
  filters: FiltersTour;
  flag: boolean;
}

const SearchComponentTour: React.FC<SearchComponentProps> = ({ query, setQuery, setFilters, filters, flag }) => {
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value === "ALL" || value == 'none' ? undefined : value
    }));
  };

  const toggleFilters = () => {
    if (showFilters) {
      setFilters({});
    }
    setShowFilters(!showFilters);
  };

  return (
    <div className="search-component">
      {flag && <Button onClick={() => navigate("/tours")} styles={{marginRight: "var(--spacing-sm)"}}>Join tour</Button>}
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleSearchChange}
        className='gift-form__search'
      />

      <button onClick={toggleFilters} className="filter-toggle-button">
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </button>

      {showFilters && (
        <div className="filters">
          <div className="filter-group">
            <label>Happens After:</label>
            <input type="date" name={"happensAfter"} value={filters.happensAfter || ""}
                   onChange={handleFilterChange}/>
          </div>

          <div className="filter-group">
            <label>Happens Before:</label>
            <input type="date" name={"happensBefore"} value={filters.happensBefore || ""}
                   onChange={handleFilterChange}/>
          </div>

          <div className="filter-group">
            <label>Location:</label>
            <select name={"location"} onChange={handleFilterChange}>
              {regions.map((loc) => (
                <option key={loc} value={loc === "ALL" ? undefined : loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Sort By Date:</label>
            <select name={"orderDate"} onChange={handleFilterChange}>
              {sorts.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchComponentTour;
