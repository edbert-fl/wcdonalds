import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./app/screens/Login";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { FIREBASE_AUTH } from "./FirebaseConfig";

import React from "react";
import { ProductPage } from "./app/screens/ProductPage";
import { ProductDetails } from "./app/screens/ProductDetails";
import { Cart } from "./app/screens/Cart";
import { CartContext } from "./app/components/CartContext";
import { CartItem } from "./app/utils/Interface";
import { View } from "react-native";
import AppHeader from "./app/components/AppHeader";
import Icon from "react-native-vector-icons/MaterialIcons";
import SuccessPage from "./app/screens/SuccessPage";
import { isAdmin } from "./Admin";
import NavigationMenu from "./app/screens/NavigationMenu";
import AdminDashboard from "./app/screens/AdminDashboard";
import AddNewProduct from "./app/screens/AddNewProduct";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartVisible, setCartVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  let delayedSetUserTimeout: NodeJS.Timeout | null = null;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (authUser) => {
      console.log(authUser);
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
        // Sets menu to be invisible and waits for menu to be disabled before setting user.
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
      <CartContext.Provider
        value={{ cart, setCart, cartVisible, setCartVisible }}
      >
        <Stack.Navigator initialRouteName="All Products">
          {user != null ? (
            <>
              <Stack.Screen
                name="All Products"
                options={{
                  headerShown: false,
                }}
              >
                {() => (
                  <View>
                    <View>
                      <NavigationMenu
                        admin={isAdmin(user.uid)}
                        handleSignOut={handleSignOut}
                        menuVisible={menuVisible}
                        setMenuVisible={(menuVisible) =>
                          setMenuVisible(menuVisible)
                        }
                      />
                      <AppHeader
                        title="All Products"
                        onBackIcon={
                          <Icon name="menu" size={25} color="#FFFFFF" />
                        }
                        onBackPress={() => handleOpenMenu()}
                        onRightPress={() => handleOpenCart()}
                        onRightIcon={
                          <Icon
                            name="shopping-cart"
                            size={25}
                            color="#FFFFFF"
                          />
                        }
                      />
                    </View>

                    <Cart />
                    <ProductPage />
                  </View>
                )}
              </Stack.Screen>

              <Stack.Screen
                name="Product Details"
                component={ProductDetails}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Success"
                component={SuccessPage}
                options={{ headerShown: false }}
              />

              <Stack.Screen name="Admin" options={{ headerShown: false }}>
                {() => (
                  <View>
                    <NavigationMenu
                      admin={true}
                      handleSignOut={handleSignOut}
                      menuVisible={menuVisible}
                      setMenuVisible={(menuVisible) => setMenuVisible(menuVisible)}
                      />
                    <AppHeader
                      title="Admin Dashboard"
                      onBackIcon={<Icon name="menu" size={25} color="#FFFFFF" />}
                      onBackPress={() => handleOpenMenu()}
                      onRightPress={() => handleOpenCart()}
                      onRightIcon={<Icon name="shopping-cart" size={25} color="#FFFFFF" />}
                    />
                    <Cart />
                    <AdminDashboard/>
                  </View>
                )}
              </Stack.Screen>

              <Stack.Screen
                name="Add New Product"
                component={AddNewProduct}
                options={{ headerShown: false }}
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
