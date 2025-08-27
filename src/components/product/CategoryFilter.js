// src/components/product/CategoryFilter.js
import React from 'react';
import { categories } from '../../data/products';

function CategoryFilter() {
  return (
    <div style={{ 
      padding: '1rem',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ marginTop: 0 }}>Categories</h3>
      
      <ul style={{ 
        listStyle: 'none', 
        padding: 0,
        margin: 0
      }}>
        {categories.map(category => (
          <li key={category.id} style={{ marginBottom: '0.5rem' }}>
            <a 
              href={`#${category.id}`}
              style={{ 
                textDecoration: 'none',
                color: '#333',
                display: 'block',
                padding: '0.5rem',
                borderRadius: '4px',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              {category.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryFilter;