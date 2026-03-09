import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <h1
      className="appHeader"
      id="appHeader"
      onScroll={(e) => console.log("scrolling!", e.target.scrollTop)}
    >
      {" "}
      🎬 Movies Hub{" "}
    </h1>
  );
};

export default Header;
