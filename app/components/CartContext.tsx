import { Dispatch, SetStateAction, createContext, useContext } from 'react';
import { CartItem } from '../utils/Interface';
import { AddressDetails } from '@stripe/stripe-react-native';

interface CartContextProps {
    cart: CartItem[];
    setCart: Dispatch<SetStateAction<CartItem[]>>;
    cartVisible: boolean;
    setCartVisible: Dispatch<SetStateAction<boolean>>;
    address: AddressDetails;
    setAddress: Dispatch<SetStateAction<AddressDetails>>;
}

export const CartContext = createContext<CartContextProps | undefined> ({
    cart: [],
    setCart: () => {},
    cartVisible: false,
    setCartVisible: () => {},
    address: {},
    setAddress: () => {}
});

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
