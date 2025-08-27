// src/contexts/CartContext.js
import { createContext, useContext, useReducer, useMemo } from 'react';

// Crear el contexto
const CartContext = createContext();

// Estado inicial
const initialState = {
  items: [],
  totalPrice: 0,
  itemCount: 0
};

// Reducer para manejar las acciones del carrito
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        // Si el item ya existe, incrementar cantidad
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        
        return {
          ...state,
          items: updatedItems,
          totalPrice: state.totalPrice + action.payload.price,
          itemCount: state.itemCount + 1
        };
      }
      
      // Si es un item nuevo, agregarlo
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
        totalPrice: state.totalPrice + action.payload.price,
        itemCount: state.itemCount + 1
      };
    }
    
    case 'REMOVE_ITEM': {
      const itemToRemove = state.items.find(item => item.id === action.payload);
      
      if (!itemToRemove) return state;
      
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      
      return {
        ...state,
        items: filteredItems,
        totalPrice: state.totalPrice - (itemToRemove.price * itemToRemove.quantity),
        itemCount: state.itemCount - itemToRemove.quantity
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (!item || quantity < 0) return state;
      
      if (quantity === 0) {
        // Si cantidad es 0, remover el item
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: id });
      }
      
      const quantityDiff = quantity - item.quantity;
      const updatedItems = state.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      
      return {
        ...state,
        items: updatedItems,
        totalPrice: state.totalPrice + (item.price * quantityDiff),
        itemCount: state.itemCount + quantityDiff
      };
    }
    
    case 'CLEAR_CART':
      return initialState;
    
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// Provider component
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  // Acciones memoizadas para evitar re-renders innecesarios
  const addToCart = useMemo(() => (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  }, []);
  
  const removeFromCart = useMemo(() => (productId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  }, []);
  
  const updateQuantity = useMemo(() => (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  }, []);
  
  const clearCart = useMemo(() => () => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);
  
  // Funciones helpers
  const getItemQuantity = useMemo(() => (productId) => {
    const item = state.items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  }, [state.items]);
  
  const isItemInCart = useMemo(() => (productId) => {
    return state.items.some(item => item.id === productId);
  }, [state.items]);
  
  // Valor del contexto memoizado
  const value = useMemo(() => ({
    // Estado
    ...state,
    // Acciones
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    // Helpers
    getItemQuantity,
    isItemInCart
  }), [
    state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity,
    isItemInCart
  ]);
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook para usar el contexto
export function useCart() {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
}

// Exportar el contexto para testing (opcional)
export { CartContext };