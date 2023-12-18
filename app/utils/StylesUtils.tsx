import { StyleSheet } from "react-native";

export const theme = {
  colors: {
    primary: "#E53935",
    accent: "#FFA000",
    background: "#FFFFFF",
    surface: "#F9F9F9",
    text: "#555555",
    placeholderText: "#B0BEC5",
    buttonText: "#FFFFFF",
    link: "#0E7AFE",
    error: "#FF5252",
    success: "#3BBD5E",
    warning: "#FFC107",
    divider: "#E0E0E0",
    search: "#EAEAEA",
    imagePlaceholder: "#EEEEEE",
  },
};

export const successStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    padding: 20,
    paddingBottom: 120,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  linkText: {
    color: "blue",
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 15,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  secondaryButton: {
    backgroundColor: theme.colors.accent,
    borderRadius: 5,
    padding: 15,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export const productStyles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    color: "#AAA",
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: "#E65100",
    marginBottom: 20,
  },
  productInfoContainer: {
    padding: 20,
    backgroundColor: theme.colors.background,
    height: "100%",
  },
  productTextContainer: {
    alignItems: "center",
  },
});


export const cartStyles = StyleSheet.create({
  cart: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  cartContainer: {
    height: "100%",
    backgroundColor: theme.colors.background,
  },
  cartItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    padding: 10,
    backgroundColor: theme.colors.background,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  quantityCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    marginRight: 15,
    padding: 10,
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,
    elevation: 5,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 4,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  quantity: {
    fontSize: 14,
    color: "#888",
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "30%",
  },
  emptyCartText: {
    fontSize: 18,
    marginTop: 10,
    color: theme.colors.placeholderText,
  },
  button: {
    backgroundColor: theme.colors.success,
    marginTop: 15,
    width: "100%",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  removeButton: {
    backgroundColor: theme.colors.warning,
    marginTop: 15,
    width: "100%",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    color: theme.colors.text,
    marginRight: 10,
  },
  cartFooter: {
    alignItems: "center",
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
    width: "100%",
    backgroundColor: theme.colors.background,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,
    elevation: 5,
  },
  totalPriceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  totalText: {
    fontSize: 16,
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: "600",
  },
});
