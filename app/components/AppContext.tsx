import { Dispatch, SetStateAction, createContext, useContext } from 'react';
import { CartItem } from '../utils/Interface';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../utils/Types';

interface AppContextProps {
    navigation: StackNavigationProp<RootStackParamList, 'All Products'>;
    cart: CartItem[];
    setCart: Dispatch<SetStateAction<CartItem[]>>;
    cartVisible: boolean;
    setCartVisible: Dispatch<SetStateAction<boolean>>;
}

export const AppContext = createContext<AppContextProps | undefined> ({
    navigation: { navigate: () => {} } as StackNavigationProp<RootStackParamList, 'All Products'>,
    cart: [],
    setCart: () => {},
    cartVisible: false,
    setCartVisible: () => {}
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
