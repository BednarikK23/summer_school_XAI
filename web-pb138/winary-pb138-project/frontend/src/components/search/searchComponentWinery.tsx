import React, { useState } from 'react';
import "./searchComponent.css";
import { openingHours, regions, wineTypes, sorts, FiltersWinery } from "./constantsFilters";

interface SearchComponentProps {
    query: string;
    setQuery: (query: string) => void;
    setFilters: React.Dispatch<React.SetStateAction<FiltersWinery>>;
}

const SearchComponentWinery: React.FC<SearchComponentProps> = ({ query, setQuery, setFilters }) => {
    const [showFilters, setShowFilters] = useState(false);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value === "ALL" ? undefined : value === 'none' ? undefined : value,
        }));
    };

    const toggleFilters = () => {
        if (showFilters === true) {
            setFilters({});
        }
        setShowFilters(!showFilters);
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
                      <label>Opens Before:</label>
                      <select name={"openingTime"} onChange={handleFilterChange}>
                          {openingHours.map((hour) => (
                            <option key={hour} value={hour}>{hour}</option>
                          ))}
                      </select>
                  </div>
                  <div className="filter-group">
                      <label>Closes After:</label>
                      <select name={"closingTime"} onChange={handleFilterChange}>
                          {openingHours.map((hour) => (
                            <option key={hour} value={hour}>{hour}</option>
                          ))}
                      </select>
                  </div>

                  <div className="filter-group">
                      <label>Wine Type:</label>
                      <select name={"wineType"} onChange={handleFilterChange}>
                          {wineTypes.map((type) => (
                            <option key={type} value={type === "ALL" ? undefined : type}>{type}</option>
                          ))}
                      </select>
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
                      <label>Sort By Opening:</label>
                      <select name={"orderOpen"} onChange={handleFilterChange}>
                          {sorts.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                      </select>
                  </div>

                  <div className="filter-group">
                      <label>Sort By Closing:</label>
                      <select name={"orderClose"} onChange={handleFilterChange}>
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

export default SearchComponentWinery;
