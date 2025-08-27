// src/components/layout/Sidebar.js
import React from 'react';
import CategoryFilter from '../product/CategoryFilter';
import CartSummary from '../cart/CartSummary';

function Sidebar() {
  return (
    <aside style={{ 
      width: '300px',
      padding: '1rem',
      backgroundColor: '#f8f9fa',
      borderLeft: '1px solid #dee2e6',
      minHeight: '100vh'
    }}>
      <CategoryFilter />
      <div style={{ marginTop: '2rem' }}>
        <CartSummary />
      </div>
    </aside>
  );
}

export default Sidebar;