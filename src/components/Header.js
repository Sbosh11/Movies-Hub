import React from 'react';
import './Header.css';


const Header = () => {

  return (
    <span className="appHeader" id='appHeader'onScroll={(e) => console.log("scrolling!", e.target.scrollTop)} > 🎬 Movies Hub 🎥 </span>
  )
}

export default Header