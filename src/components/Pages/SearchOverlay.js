import React from "react";
import Search from "./Search";
import "./SearchOverlay.css";

const SearchOverlay = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="search-overlay-wrapper">
      <div className="search-overlay-inner">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <Search />
      </div>
    </div>
  );
};

export default SearchOverlay;
