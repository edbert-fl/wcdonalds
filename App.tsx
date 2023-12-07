import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./app/screens/Login";
import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { FIREBASE_AUTH } from "./FirebaseConfig";

import React from "react";
import { ProductPage } from "./app/screens/ProductPage";
import { ProductDetails } from "./app/screens/ProductDetails";
import { Cart } from "./app/screens/Cart"
import CartButton from "./app/components/CartButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { CartContext } from "./app/components/CartContext";
import { CartItem } from "./app/utils/Interface";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() =>
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    })
  );

  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartVisible, setCartVisible] = useState(false);

  return (
    <NavigationContainer>
      <CartContext.Provider value={{ cart, setCart, cartVisible, setCartVisible }}>
        <Stack.Navigator initialRouteName="Login">
          {user ? (
            <>
              <Stack.Screen
                name="All Products"
                options={{
                  headerRight: () => <CartButton />,
                }}
              >
                {() => (
                  <SafeAreaView>
                    <Cart />
                    <ProductPage />
                  </SafeAreaView>
                )}
              </Stack.Screen>

              <Stack.Screen
                name="Product Details"
                component={ProductDetails}
                options={{ headerShown: true }}
              />
            </>
          ) : (
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </CartContext.Provider>
    </NavigationContainer>
  );
}
