// src/components/layout/Navigation.js
import React from 'react';

function Navigation() {
  return (
    <nav>
      <ul style={{ 
        display: 'flex', 
        listStyle: 'none', 
        gap: '2rem',
        margin: 0,
        padding: 0
      }}>
        <li><a href="#home" style={{ textDecoration: 'none', color: '#333' }}>Home</a></li>
        <li><a href="#products" style={{ textDecoration: 'none', color: '#333' }}>Products</a></li>
        <li><a href="#about" style={{ textDecoration: 'none', color: '#333' }}>About</a></li>
        <li><a href="#contact" style={{ textDecoration: 'none', color: '#333' }}>Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navigation;