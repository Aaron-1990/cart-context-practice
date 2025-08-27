// src/components/cart/CartLink.js
import React from 'react';
import { useCart } from '../../contexts/CartContext';

function CartLink() {
  const { itemCount } = useCart();
  
  return (
    <div style={{ marginTop: '1rem' }}>
      <a 
        href="#cart" 
        style={{ 
          color: '#007bff', 
          textDecoration: 'none',
          fontSize: '0.9rem'
        }}
      >
        🛒 View Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
      </a>
    </div>
  );
}

export default CartLink;