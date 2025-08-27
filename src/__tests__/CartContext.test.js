// src/__tests__/CartContext.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../contexts/CartContext';

// Mock product for testing
const mockProduct = {
  id: 1,
  name: 'Test Product',
  price: 10.99,
  category: 'test',
  description: 'A test product'
};

// Wrapper component for testing
const TestWrapper = ({ children }) => (
  <CartProvider>{children}</CartProvider>
);

describe('CartContext', () => {
  describe('useCart hook', () => {
    it('should throw error when used outside provider', () => {
      // Suppress console.error for this test
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      expect(() => {
        renderHook(() => useCart());
      }).toThrow('useCart must be used within a CartProvider');
      
      consoleSpy.mockRestore();
    });

    it('should provide initial state', () => {
      const { result } = renderHook(() => useCart(), {
        wrapper: TestWrapper
      });

      expect(result.current.items).toEqual([]);
      expect(result.current.totalPrice).toBe(0);
      expect(result.current.itemCount).toBe(0);
    });

    it('should add item to cart', () => {
      const { result } = renderHook(() => useCart(), {
        wrapper: TestWrapper
      });

      act(() => {
        result.current.addToCart(mockProduct);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0]).toEqual({
        ...mockProduct,
        quantity: 1
      });
      expect(result.current.totalPrice).toBe(10.99);
      expect(result.current.itemCount).toBe(1);
    });

    it('should increment quantity when adding same item', () => {
      const { result } = renderHook(() => useCart(), {
        wrapper: TestWrapper
      });

      act(() => {
        result.current.addToCart(mockProduct);
        result.current.addToCart(mockProduct);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].quantity).toBe(2);
      expect(result.current.totalPrice).toBe(21.98);
      expect(result.current.itemCount).toBe(2);
    });

    it('should remove item from cart', () => {
      const { result } = renderHook(() => useCart(), {
        wrapper: TestWrapper
      });

      act(() => {
        result.current.addToCart(mockProduct);
      });

      expect(result.current.items).toHaveLength(1);

      act(() => {
        result.current.removeFromCart(mockProduct.id);
      });

      expect(result.current.items).toHaveLength(0);
      expect(result.current.totalPrice).toBe(0);
      expect(result.current.itemCount).toBe(0);
    });

    it('should update item quantity', () => {
      const { result } = renderHook(() => useCart(), {
        wrapper: TestWrapper
      });

      act(() => {
        result.current.addToCart(mockProduct);
      });

      act(() => {
        result.current.updateQuantity(mockProduct.id, 3);
      });

      expect(result.current.items[0].quantity).toBe(3);
      expect(result.current.totalPrice).toBe(32.97);
      expect(result.current.itemCount).toBe(3);
    });

    it('should remove item when quantity updated to 0', () => {
      const { result } = renderHook(() => useCart(), {
        wrapper: TestWrapper
      });

      act(() => {
        result.current.addToCart(mockProduct);
      });

      act(() => {
        result.current.updateQuantity(mockProduct.id, 0);
      });

      expect(result.current.items).toHaveLength(0);
      expect(result.current.totalPrice).toBe(0);
      expect(result.current.itemCount).toBe(0);
    });

    it('should clear all items', () => {
      const { result } = renderHook(() => useCart(), {
        wrapper: TestWrapper
      });

      act(() => {
        result.current.addToCart(mockProduct);
        result.current.addToCart({ ...mockProduct, id: 2, name: 'Product 2' });
      });

      expect(result.current.items).toHaveLength(2);

      act(() => {
        result.current.clearCart();
      });

      expect(result.current.items).toHaveLength(0);
      expect(result.current.totalPrice).toBe(0);
      expect(result.current.itemCount).toBe(0);
    });

    it('should check if item is in cart', () => {
      const { result } = renderHook(() => useCart(), {
        wrapper: TestWrapper
      });

      expect(result.current.isItemInCart(mockProduct.id)).toBe(false);

      act(() => {
        result.current.addToCart(mockProduct);
      });

      expect(result.current.isItemInCart(mockProduct.id)).toBe(true);
    });

    it('should get item quantity', () => {
      const { result } = renderHook(() => useCart(), {
        wrapper: TestWrapper
      });

      expect(result.current.getItemQuantity(mockProduct.id)).toBe(0);

      act(() => {
        result.current.addToCart(mockProduct);
        result.current.addToCart(mockProduct);
      });

      expect(result.current.getItemQuantity(mockProduct.id)).toBe(2);
    });
  });

  describe('Cart integration', () => {
    const TestComponent = () => {
      const { items, addToCart, totalPrice } = useCart();
      
      return (
        <div>
          <p data-testid="item-count">{items.length}</p>
          <p data-testid="total-price">${totalPrice.toFixed(2)}</p>
          <button 
            onClick={() => addToCart(mockProduct)}
            data-testid="add-button"
          >
            Add Product
          </button>
        </div>
      );
    };

    it('should update UI when cart changes', () => {
      render(
        <CartProvider>
          <TestComponent />
        </CartProvider>
      );

      expect(screen.getByTestId('item-count')).toHaveTextContent('0');
      expect(screen.getByTestId('total-price')).toHaveTextContent('$0.00');

      fireEvent.click(screen.getByTestId('add-button'));

      expect(screen.getByTestId('item-count')).toHaveTextContent('1');
      expect(screen.getByTestId('total-price')).toHaveTextContent('$10.99');
    });
  });
});