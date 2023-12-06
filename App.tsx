import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./app/screens/Login";
import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { FIREBASE_AUTH } from "./FirebaseConfig";

import React from "react";
import { ProductPage } from "./app/screens/Product/ProductPage";
import { ProductDetails } from "./app/screens/Product/ProductDetails";
import { Cart, CartItem } from "./app/screens/Cart"
import CartButton from "./app/components/CartButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { CartContext } from "./app/components/CartContext";

const Stack = createNativeStackNavigator();

let cart = [new CartItem("8OSidf59KlAOozsuXiGo", 2), new CartItem("bUx6ePMH55o0YPsVbbON", 1)]

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() =>
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    })
  );

  const [cartVisible, setCartVisible] = useState(false);

  return (
    <NavigationContainer>
      <CartContext.Provider value={{ cart, cartVisible, setCartVisible }}>
        <Stack.Navigator initialRouteName="Login">
          {user ? (
            <>
              <Stack.Screen
                name="All Products"
                  component={() => {return (
                    <SafeAreaView>
                      <Cart/>
                      <ProductPage/>
                    </SafeAreaView>
                  )
                }}
                options={{
                  headerRight: () => (
                    <CartButton/>
                  )
                }}
              />
              
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
