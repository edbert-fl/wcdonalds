import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { CartItem } from "../utils/InterfaceUtils";
import { AddressDetails } from "@stripe/stripe-react-native";
import { User } from "firebase/auth";

interface AppContextProps {
  cart: CartItem[];
  setCart: Dispatch<SetStateAction<CartItem[]>>;
  cartVisible: boolean;
  setCartVisible: Dispatch<SetStateAction<boolean>>;
  address: AddressDetails;
  setAddress: Dispatch<SetStateAction<AddressDetails>>;
  authUser: User | null;
  handleSignOut: () => void;
  menuVisible: boolean;
  setMenuVisible: Dispatch<SetStateAction<boolean>>;
  handleOpenMenu: () => void;
  handleOpenCart: () => void;
}

export const AppContext = createContext<AppContextProps | undefined>({
  cart: [],
  setCart: () => {},
  cartVisible: false,
  setCartVisible: () => {},
  address: {},
  setAddress: () => {},
  authUser: null,
  handleSignOut: () => {},
  menuVisible: false,
  setMenuVisible: () => {},
  handleOpenMenu: () => {},
  handleOpenCart: () => {},
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
