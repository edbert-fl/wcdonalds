import React from "react";
import AddProductScreen from "../screens/AddProductScreen";
import AddPromotionScreen from "../screens/AddPromotionScreen";
import { AllProductsScreen } from "../screens/AllProductsScreen";
import { CategoryProductsScreen } from "../screens/CategoryProductsScreen";
import { DealProductsScreen } from "../screens/DealProductsScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import UserProfileScreen from "../screens/UserProfileScreen";
import { useAppContext } from "./AppContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useRoute } from "@react-navigation/native";
import { ProductDetailsScreen } from "../screens/ProductDetailsScreen";
import SuccessScreen from "../screens/SuccessScreen";

const Stack = createNativeStackNavigator();

const ProductDetailsScreenFC = () => (
  <ProductDetailsScreen route={useRoute()} />
);

const SuccessScreenFC = () => <SuccessScreen route={useRoute()} />;

const AppNavigator = () => {
  const { authUser } = useAppContext();
  return (
    <Stack.Navigator initialRouteName="Home">
      {authUser != null ? (
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
            component={ProductDetailsScreenFC}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Category"
            component={CategoryProductsScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Deals"
            component={DealProductsScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Success"
            component={SuccessScreenFC}
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

          <Stack.Screen
            name="UserProfile"
            component={UserProfileScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
