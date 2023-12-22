import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { FIREBASE_AUTH } from "./FirebaseConfig";

import React from "react";
import { AppContext } from "./app/components/AppContext";
import { CartItem } from "./app/utils/InterfaceUtils";
import { AddressDetails } from "@stripe/stripe-react-native";
import AppNavigator from "./app/components/AppNavigator";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [address, setAddress] = useState<AddressDetails>({});
  const [cartVisible, setCartVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  let delayedSetUserTimeout: NodeJS.Timeout | null = null;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (authUser) => {
      if (signingOut) {
        FIREBASE_AUTH.signOut()
          .then(() => {
            console.log("Firebase sign-out complete.");
          })
          .catch((error) => {
            console.error("Sign-out error:", error);
          })
          .finally(() => {
            setSigningOut(false);
          });
      } else {
        setMenuVisible(false);
        delayedSetUserTimeout = setTimeout(() => {
          setUser(authUser);
        }, 400);
      }
    });

    return () => unsubscribe();
  }, [signingOut]);

  const handleSignOut = async () => {
    try {
      setSigningOut(true);
      await FIREBASE_AUTH.signOut();
    } catch (error) {
      console.error("Sign-out error:", error);
    } finally {
      setSigningOut(false);
    }
  };

  const handleOpenMenu = () => {
    setMenuVisible(true);
    setCartVisible(false);
  };

  const handleOpenCart = () => {
    setCartVisible(true);
    setMenuVisible(false);
  };

  return (
    <NavigationContainer>
      <AppContext.Provider
        value={{
          cart: cart,
          setCart: setCart,
          address: address,
          setAddress: setAddress,
          cartVisible: cartVisible,
          setCartVisible: setCartVisible,
          authUser: user,
          handleSignOut: handleSignOut,
          menuVisible: menuVisible,
          setMenuVisible: setMenuVisible,
          handleOpenMenu: handleOpenMenu,
          handleOpenCart: handleOpenCart,
        }}
      >
        <AppNavigator/>
      </AppContext.Provider>
    </NavigationContainer>
  );
}