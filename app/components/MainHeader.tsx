import {
    View,
  } from "react-native";
  import React, {  } from "react";
  import Icon from "react-native-vector-icons/MaterialIcons";
  import NavigationScreen from "../screens/NavigationScreen";
  import AppHeader from "./AppHeader";
  import { isAdmin } from "../../Admin";
  import { useAppContext } from "./AppContext";
  import { CartScreen } from "../screens/CartScreen";

  interface MainHeaderProps {
    title: string;
  }

  export const MainHeader: React.FC<MainHeaderProps> = ({ title }) => {
    const { authUser, handleSignOut, menuVisible, setMenuVisible, handleOpenMenu, handleOpenCart } = useAppContext();
  
    if (authUser == null) {
      throw("Error: No user has been logged in!")
    }
  
    return (
      <View>
        <NavigationScreen
          admin={isAdmin(authUser.uid)}
          handleSignOut={handleSignOut}
          menuVisible={menuVisible}
          setMenuVisible={(menuVisible) => setMenuVisible(menuVisible)}
        />
        <AppHeader
          title={title}
          onBackIcon={<Icon name="menu" size={25} color="#FFFFFF" />}
          onBackPress={() => handleOpenMenu()}
          onRightPress={() => handleOpenCart()}
          onRightIcon={<Icon name="shopping-cart" size={25} color="#FFFFFF" />}
        />
        <CartScreen />
    </View>
    );
  };