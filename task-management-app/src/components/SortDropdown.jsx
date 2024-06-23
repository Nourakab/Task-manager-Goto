import React from "react";
import "./SortDropdown.css";

const SortDropdown = ({ sortCriteria, setSortCriteria }) => {
  return (
    <div className="sort-dropdown">
      <select
        size="small"
        value={sortCriteria}
        onChange={(e) => setSortCriteria(e.target.value)}
      >
        <option value="title">Sort by Title</option>
        <option value="endDate">Sort by End Date</option>
        <option value="status">Sort by Status</option>
      </select>
    </div>
  );
};

export default SortDropdown;
