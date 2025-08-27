// src/components/cart/CartIcon.js
import React from 'react';
import { useCart } from '../../contexts/CartContext';

function CartIcon() {
  const { itemCount, totalPrice } = useCart();
  
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      backgroundColor: '#007bff',
      color: 'white',
      borderRadius: '20px',
      cursor: 'pointer'
    }}>
      <span style={{ fontSize: '1.5rem' }}>🛒</span>
      <div>
        <div style={{ fontWeight: 'bold' }}>
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </div>
        <div style={{ fontSize: '0.8rem' }}>
          ${totalPrice.toFixed(2)}
        </div>
      </div>
    </div>
  );
}

export default CartIcon;