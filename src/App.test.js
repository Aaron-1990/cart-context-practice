// src/App.test.js
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders e-commerce store header', () => {
  render(<App />);
  // Buscar específicamente el h1 del header
  const headerElement = screen.getByRole('heading', { level: 1, name: /E-Commerce Store/i });
  expect(headerElement).toBeInTheDocument();
});

test('renders our products section', () => {
  render(<App />);
  // Buscar específicamente el h2
  const productsElement = screen.getByRole('heading', { level: 2, name: /Our Products/i });
  expect(productsElement).toBeInTheDocument();
});

test('renders cart icon in header', () => {
  render(<App />);
  // Buscar el elemento del carrito usando data-testid o texto más específico
  const cartElement = screen.getByText('🛒');
  expect(cartElement).toBeInTheDocument();
  
  // Verificar que aparece el precio inicial
  const cartTotal = screen.getByText(/\$0\.00/);
  expect(cartTotal).toBeInTheDocument();
});

test('renders product category filter buttons', () => {
  render(<App />);
  // Buscar botones específicamente en el área de filtros
  const buttons = screen.getAllByRole('button');
  
  // Verificar que hay botones de categoría
  const allProductsButtons = buttons.filter(button => 
    button.textContent.includes('All Products')
  );
  expect(allProductsButtons.length).toBeGreaterThan(0);
  
  const electronicsButtons = buttons.filter(button => 
    button.textContent.includes('electronics')
  );
  expect(electronicsButtons.length).toBeGreaterThan(0);
});

test('renders navigation links in header', () => {
  render(<App />);
  // Buscar links específicos por href
  const homeLink = screen.getByRole('link', { name: /Home/i });
  expect(homeLink).toBeInTheDocument();
  expect(homeLink.getAttribute('href')).toBe('#home');
  
  const aboutLink = screen.getByRole('link', { name: /About/i });
  expect(aboutLink).toBeInTheDocument();
  expect(aboutLink.getAttribute('href')).toBe('#about');
});

test('renders footer with copyright', () => {
  render(<App />);
  // Buscar texto específico del footer
  const copyrightText = screen.getByText(/© 2024 E-Commerce Store. All rights reserved./i);
  expect(copyrightText).toBeInTheDocument();
});

test('renders cart link in footer', () => {
  render(<App />);
  // Buscar el link específico del carrito en el footer
  const cartLink = screen.getByRole('link', { name: /View Cart/i });
  expect(cartLink).toBeInTheDocument();
  expect(cartLink.getAttribute('href')).toBe('#cart');
});

test('renders empty cart message initially', () => {
  render(<App />);
  const emptyCartMessage = screen.getByText(/Your cart is empty/i);
  expect(emptyCartMessage).toBeInTheDocument();
});

test('renders product cards', () => {
  render(<App />);
  // Verificar que se renderizan productos
  const macbookProduct = screen.getByText('MacBook Pro 14');
  expect(macbookProduct).toBeInTheDocument();
  
  const iphoneProduct = screen.getByText('iPhone 15 Pro');
  expect(iphoneProduct).toBeInTheDocument();
  
  // Verificar que hay botones "Add to Cart"
  const addToCartButtons = screen.getAllByRole('button', { name: /Add to Cart/i });
  expect(addToCartButtons.length).toBeGreaterThan(0);
});