import { StyleSheet } from "react-native";

export const theme = {
  colors: {
    primary: '#E53935', 
    accent: '#FFA000', 
    background: '#ffffff', 
    surface: '#F5F5F5',
    text: '#333333', 
    placeholderText: '#B0BEC5',
    error: '#FF5252',
    success: '#4CAF50',
    warning: '#FFC107',
    divider: '#E0E0E0',
  },
};

export const cardStyles = StyleSheet.create({
    image: {
      width: "100%",
      height: 200,
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
    },
    name: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 4,
    },
    description: {
      fontSize: 14,
      color: theme.colors.text,
      marginBottom: 4,
    },
    price: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme.colors.primary,
    },
  });

  export const productStyles = StyleSheet.create({
    productPageContainer: {
        backgroundColor: "#FFF"
    }, 
    image: {
      width: "100%",
      height: 200,
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
    },
    name: {
      fontSize: 36,
      fontWeight: "bold",
      marginBottom: 4,
    },
    description: {
      fontSize: 16,
      color: "#AAA",
    },
    price: {
      fontSize: 16,
      color: "#E65100",
      marginBottom: 20
    },
    productInfoContainer: {
      padding: 20
    }
  });

  export const cartPage = StyleSheet.create({
    upper: {
        height: 120,
        backgroundColor: '#DDD',
        opacity: .5
    },
    lower: {
        flex: 1,
        backgroundColor: theme.colors.surface,
        borderCurve: 10
    }
  });