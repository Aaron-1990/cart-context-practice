// src/components/layout/Footer.js
import React from 'react';
import CartLink from '../cart/CartLink';

function Footer() {
  return (
    <footer style={{ 
      backgroundColor: '#333',
      color: 'white',
      padding: '2rem',
      textAlign: 'center',
      marginTop: 'auto'
    }}>
      <div>
        <p>&copy; 2024 E-Commerce Store. All rights reserved.</p>
        <CartLink />
      </div>
    </footer>
  );
}

export default Footer;