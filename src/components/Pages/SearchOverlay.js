import React from "react";
import Search from "./Search"; // your actual Search component
import "./SearchOverlay.css"; // optional, use your own or remove

const SearchOverlay = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="search-overlay-wrapper">
      <div className="search-overlay-inner">
        <Search />
      </div>
    </div>
  );
};

export default SearchOverlay;
