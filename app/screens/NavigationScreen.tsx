// components/NavigationMenu.js
import React, { useEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../utils/TypesUtils";
import { User, signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import Modal from "react-native-modal";
import { theme } from "../utils/StylesUtils";
import Icon from "react-native-vector-icons/MaterialIcons";

interface NavigationMenuProps {
  admin: boolean;
  menuVisible: boolean;
  setMenuVisible: (menuVisible: boolean) => void;
  handleSignOut: () => void;
}

const NavigationScreen: React.FC<NavigationMenuProps> = ({
  admin,
  menuVisible,
  setMenuVisible,
  handleSignOut
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const closeMenu = () => {
    setMenuVisible(false);
  };

  const handleLogout = () => {
    handleSignOut();
  };

  const navigateHome = () => {
    navigation.navigate("Home");
    closeMenu();
  }

  const navigateToMenu = () => {
    navigation.navigate("AllProducts");
    closeMenu();
  }

  const navigateAdminDashboard = () => {
    navigation.navigate("Admin");
    closeMenu();
  }

  return (
    <View>
      <Modal
        isVisible={menuVisible}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        coverScreen
        style={{ width: "100%", margin: 0 }}
        hasBackdrop
        backdropOpacity={1}
        backdropColor={theme.colors.background}
      >
        <View style={styles.menuContainer}>
          <View style={styles.menuContent}>
            <View style={styles.closeButtonContainer}>
              <TouchableOpacity onPress={closeMenu}>
                <Icon name="close" size={35} color={theme.colors.text} />
              </TouchableOpacity>
            </View>
            <View style={{ height: "55%" }}>
              <TouchableOpacity
                onPress={navigateHome}
              >
                <Text style={styles.menuItem}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={navigateToMenu}
              >
                <Text style={styles.menuItem}>Our Menu</Text>
              </TouchableOpacity>

              { admin ? (
                <TouchableOpacity onPress={navigateAdminDashboard}>
                    <Text style={styles.menuItem}>Admin Dashboard</Text>
                </TouchableOpacity>
              ) : null}
            
              <TouchableOpacity onPress={handleLogout}>
                <Text style={styles.menuItem}>Logout</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  menuContent: {
    width: "100%",
    padding: 20,
    borderTopRightRadius: 10,
    paddingBottom: 200,
  },
  menuItem: {
    color: theme.colors.primary,
    fontWeight: "bold",
    fontSize: 36,
    marginVertical: 5,
  },
  menuHeader: {
    color: theme.colors.primary,
    fontWeight: "bold",
    fontSize: 36,
  },
  closeButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: 40,
    height: "45%",
  },
  closeButton: {
    color: "gray",
    fontSize: 36,
  },
});

export default NavigationScreen;
