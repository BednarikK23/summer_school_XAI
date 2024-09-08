import React, { useState } from 'react';
import "./searchComponent.css"
import {wineTypes, FiltersWine, sorts} from "./constantsFilters.ts";

interface SearchComponentProps {
  query: string;
  setQuery: (query: string) => void;
  setFilters: React.Dispatch<React.SetStateAction<FiltersWine>>;
  filters: FiltersWine;
}

const SearchComponentWine: React.FC<SearchComponentProps> = ({ query, setQuery, setFilters, filters }) => {
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    if (showFilters === true) {
      setFilters({});
    }

    setShowFilters(!showFilters);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value === 'none' ? undefined : value,
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="search-component">
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
            <label>Wine Type:</label>
            <select name={"wineType"} onChange={handleFilterChange}>
              {wineTypes.map((type) => (
                <option key={type} value={type === "ALL" ? undefined : type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Minimum price:</label>
            <input type="number" name={"priceMin"} value={filters.priceMin || ""} onChange={handleFilterChange}/>
          </div>

          <div className="filter-group">
            <label>Maximum price:</label>
            <input type="number" name={"priceMax"} value={filters.priceMax || ""} onChange={handleFilterChange}/>
          </div>

          <div className="filter-group">
            <label>Year:</label>
            <input type="number" name={"year"} value={filters.year || ""} onChange={handleFilterChange}/>
          </div>

          <div className="filter-group">
            <label>Maximum alcohol (%):</label>
            <input type="number" step="0.1" name={"alcoholMax"} value={filters.alcoholMax || ""}
                   onChange={handleFilterChange}/>
          </div>

          <div className="filter-group">
            <label>Maximum sugar (g/l):</label>
            <input type="number" step="0.1" name={"sugarMax"} value={filters.sugarMax || ""}
                   onChange={handleFilterChange}/>
          </div>

          <div className="filter-group">
            <label>Sort By Price:</label>
            <select name={"sortPrice"} onChange={handleFilterChange}>
              {sorts.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Sort By Year:</label>
            <select name={"sortYear"} onChange={handleFilterChange}>
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

export default SearchComponentWine;