import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./app/screens/Login";
import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { FIREBASE_AUTH } from "./FirebaseConfig";

import React from "react";
import { ProductPage } from "./app/screens/ProductPage";

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() =>
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    })
  );

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {user ? (
          <Stack.Screen
            name="All Products"
            component={ProductPage}
            options={{ headerShown: true }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
