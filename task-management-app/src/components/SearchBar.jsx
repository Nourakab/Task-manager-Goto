import React from "react";
import { TextField, IconButton } from "@mui/material";
import { RiSearchFill } from "react-icons/ri";
import "./SearchBar.css";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search tasks by title"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <RiSearchFill className="search-icon" />
    </div>
  );
};

export default SearchBar;
