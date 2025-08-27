// src/components/product/ProductCard.js
import React from 'react';
import { useCart } from '../../contexts/CartContext';

function ProductCard({ product }) {
  const { addToCart, isItemInCart, getItemQuantity } = useCart();
  
  const inCart = isItemInCart(product.id);
  const quantity = getItemQuantity(product.id);
  
  return (
    <div style={{ 
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '1rem',
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
    onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
    >
      <img 
        src={product.image} 
        alt={product.name}
        style={{ 
          width: '100%', 
          height: '200px', 
          objectFit: 'cover',
          borderRadius: '4px',
          marginBottom: '1rem'
        }}
      />
      
      <h3 style={{ 
        margin: '0 0 0.5rem 0',
        fontSize: '1.1rem',
        color: '#333'
      }}>
        {product.name}
      </h3>
      
      <p style={{ 
        color: '#666',
        fontSize: '0.9rem',
        margin: '0 0 1rem 0'
      }}>
        {product.description}
      </p>
      
      <div style={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span style={{ 
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: '#007bff'
        }}>
          ${product.price.toFixed(2)}
        </span>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {inCart && (
            <span style={{ 
              backgroundColor: '#28a745',
              color: 'white',
              padding: '0.25rem 0.5rem',
              borderRadius: '12px',
              fontSize: '0.8rem'
            }}>
              {quantity} in cart
            </span>
          )}
          
          <button 
            onClick={() => addToCart(product)}
            style={{ 
              background: inCart ? '#28a745' : '#007bff',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            {inCart ? 'Add More' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;