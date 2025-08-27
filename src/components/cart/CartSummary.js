// src/components/cart/CartSummary.js
import React from 'react';
import { useCart } from '../../contexts/CartContext';

function CartSummary() {
  const { items, totalPrice, clearCart, removeFromCart, updateQuantity } = useCart();
  
  if (items.length === 0) {
    return (
      <div style={{ 
        padding: '1rem',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3>🛒 Your Cart</h3>
        <p style={{ color: '#666', textAlign: 'center' }}>Your cart is empty</p>
      </div>
    );
  }
  
  return (
    <div style={{ 
      padding: '1rem',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3>🛒 Your Cart</h3>
      
      <div style={{ marginBottom: '1rem' }}>
        {items.map(item => (
          <div 
            key={item.id} 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.5rem 0',
              borderBottom: '1px solid #eee'
            }}
          >
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                {item.name}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#666' }}>
                ${item.price.toFixed(2)} each
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button 
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                style={{ 
                  background: '#dc3545', 
                  color: 'white', 
                  border: 'none',
                  borderRadius: '4px',
                  width: '24px',
                  height: '24px',
                  cursor: 'pointer'
                }}
              >
                -
              </button>
              
              <span style={{ minWidth: '20px', textAlign: 'center' }}>
                {item.quantity}
              </span>
              
              <button 
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                style={{ 
                  background: '#28a745', 
                  color: 'white', 
                  border: 'none',
                  borderRadius: '4px',
                  width: '24px',
                  height: '24px',
                  cursor: 'pointer'
                }}
              >
                +
              </button>
              
              <button 
                onClick={() => removeFromCart(item.id)}
                style={{ 
                  background: '#6c757d', 
                  color: 'white', 
                  border: 'none',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  cursor: 'pointer',
                  marginLeft: '0.5rem'
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ 
        borderTop: '2px solid #333', 
        paddingTop: '1rem',
        textAlign: 'right'
      }}>
        <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
          Total: ${totalPrice.toFixed(2)}
        </div>
        
        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={clearCart}
            style={{ 
              background: '#dc3545', 
              color: 'white', 
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              flex: 1
            }}
          >
            Clear Cart
          </button>
          
          <button 
            style={{ 
              background: '#007bff', 
              color: 'white', 
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              flex: 2
            }}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartSummary;