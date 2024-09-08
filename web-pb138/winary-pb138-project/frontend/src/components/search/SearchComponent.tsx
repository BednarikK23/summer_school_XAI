import React from 'react';
import "./searchComponent.css"

interface SearchComponentProps {
    query: string;
    setQuery: (query: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ query, setQuery }) => {

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    return (
        <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={handleSearchChange}
            className='gift-form__search'
        />
    );
};

export default SearchComponent; 