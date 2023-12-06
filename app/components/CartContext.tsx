import { Dispatch, SetStateAction, createContext, useContext } from 'react';
import { CartItem } from '../screens/Cart';

interface CartContextProps {
    cart: CartItem[];
    quantity: number;
    cartVisible: boolean;
    setCartVisible: Dispatch<SetStateAction<boolean>>;
}

export const CartContext = createContext<CartContextProps | undefined> ({
    cart: [],
    quantity: 0,
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
