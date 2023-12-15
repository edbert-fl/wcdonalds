import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./app/screens/LoginScreen";
import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { FIREBASE_AUTH } from "./FirebaseConfig";

import React from "react";
import { AllProductsScreen } from "./app/screens/AllProductsScreen";
import { ProductDetailsScreen } from "./app/screens/ProductDetailsScreen";
import { CartScreen } from "./app/screens/CartScreen";
import { AppContext } from "./app/components/AppContext";
import { CartItem } from "./app/utils/InterfaceUtils";
import { View } from "react-native";
import AppHeader from "./app/components/AppHeader";
import Icon from "react-native-vector-icons/MaterialIcons";
import SuccessScreen from "./app/screens/SuccessScreen";
import { isAdmin } from "./Admin";
import NavigationScreen from "./app/screens/NavigationScreen";
import AdminDashboardScreen from "./app/screens/AdminDashboardScreen";
import AddProductScreen from "./app/screens/AddProductScreen";
import { AddressDetails } from "@stripe/stripe-react-native";
import AddPromotionScreen from "./app/screens/AddPromotionScreen";
import HomeScreen from "./app/screens/HomeScreen";
import { CategoryProductsScreen } from "./app/screens/CategoryProductsScreen";

const Stack = createNativeStackNavigator();

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
        // Sets menu to be invisible and waits for menu to be disabled before setting user so that the page below menu can be switched out.
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
        <Stack.Navigator initialRouteName="Home">
          {user != null ? (
            <>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AllProducts"
                component={AllProductsScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="ProductDetails"
                component={ProductDetailsScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Category"
                component={CategoryProductsScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Success"
                component={SuccessScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Admin"
                component={AdminDashboardScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="AddNewProduct"
                component={AddProductScreen}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="AddNewPromotion"
                component={AddPromotionScreen}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </AppContext.Provider>
    </NavigationContainer>
  );
}
