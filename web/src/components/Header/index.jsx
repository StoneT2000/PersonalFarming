import React from 'react';
import './index.css';
function Header() {
  return (
    <header className="Header">
        <ul>
        <a href="/"><li>Home</li></a>
        <a href="dashboard"><li>Dashboard</li></a>
        <a><li>Other?</li></a>
        </ul>
    </header>
  );
}

export default Header;
