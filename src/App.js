// src/App.js
import React from 'react';
import { CartProvider } from './contexts/CartContext';
import Header from './components/layout/Header';
import ProductList from './components/product/ProductList';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import './App.css';

function App() {
  return (
    <CartProvider>
      <div className="App" style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Header />
        
        <div style={{ 
          display: 'flex', 
          flex: 1,
          minHeight: 'calc(100vh - 120px)' // Adjust for header/footer
        }}>
          <ProductList />
          <Sidebar />
        </div>
        
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;