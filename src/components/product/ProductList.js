// src/components/product/ProductList.js
import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { products } from '../../data/products';

function ProductList() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);
  
  return (
    <main style={{ 
      flex: 1, 
      padding: '2rem',
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2>Our Products</h2>
        <p style={{ color: '#666' }}>
          Discover our amazing collection of products
        </p>
      </div>
      
      {/* Category buttons */}
      <div style={{ marginBottom: '2rem' }}>
        {['all', 'electronics', 'clothing', 'books'].map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              margin: '0 0.5rem 0.5rem 0',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '20px',
              backgroundColor: selectedCategory === category ? '#007bff' : '#e9ecef',
              color: selectedCategory === category ? 'white' : '#333',
              cursor: 'pointer',
              textTransform: 'capitalize'
            }}
          >
            {category === 'all' ? 'All Products' : category}
          </button>
        ))}
      </div>
      
      {/* Products grid */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '4rem',
          color: '#666'
        }}>
          <p>No products found in this category.</p>
        </div>
      )}
    </main>
  );
}

export default ProductList;