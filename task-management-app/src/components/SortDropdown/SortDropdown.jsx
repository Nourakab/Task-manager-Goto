import React from "react";
import "./SortDropdown.css";

const SortDropdown = ({ sortCriteria, setSortCriteria }) => {
  return (
    <div className="sort-dropdown-container ">
      <div className="sort-dropdown">
        <select
          size="small"
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
        >
          <option value="title" className="sort-dropdown-option">
            Sort by Title
          </option>
          <option value="endDate" className="sort-dropdown-option">
            Sort by End Date
          </option>
          <option value="status" className="sort-dropdown-option">
            Sort by Status
          </option>
        </select>
      </div>
    </div>
  );
};

export default SortDropdown;
