
// src/components/layout/Header.js
import React from 'react';
import Navigation from './Navigation';
import CartIcon from '../cart/CartIcon';

function Header() {
  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #dee2e6'
    }}>
      <div>
        <h1>🛍️ E-Commerce Store</h1>
      </div>
      <Navigation />
      <CartIcon />
    </header>
  );
}

export default Header;
