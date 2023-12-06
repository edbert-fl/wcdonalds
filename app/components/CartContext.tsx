import { createContext, useContext } from 'react';

export const CartContext = createContext({
    cartVisible: false,
    setCartVisible: (isVisible: boolean) => {}
  });

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
