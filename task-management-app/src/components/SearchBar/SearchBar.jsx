import React, { useState } from "react";
import { RiSearchFill } from "react-icons/ri";
import "./SearchBar.css";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const [error, setError] = useState("");

  const handleSearchClick = () => {
    if (!searchQuery.trim()) {
      setError("Please enter a search query");
    } else {
      setError("");
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value) {
      setError("");
    }
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search tasks by title"
        value={searchQuery}
        onChange={handleInputChange}
        className="search-input"
      />
      <button className="search-button" onClick={handleSearchClick}>
        <RiSearchFill className="search-icon" />
      </button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default SearchBar;
