import React from 'react';
import './Header.css'

const Header = () => {
  return (
    <header onClick={() => window.scroll(0,0)} className="App-header"><h1> 🎬 Movies Hub 🎥 </h1></header>
  )
}

export default Header