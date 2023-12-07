import { Dispatch, SetStateAction, createContext, useContext } from 'react';
import { CartItem } from '../utils/Interface';

interface CartContextProps {
    cart: CartItem[];
    setCart: Dispatch<SetStateAction<CartItem[]>>;
    cartVisible: boolean;
    setCartVisible: Dispatch<SetStateAction<boolean>>;
}

export const CartContext = createContext<CartContextProps | undefined> ({
    cart: [],
    setCart: () => {},
    cartVisible: false,
    setCartVisible: () => {}
});

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
