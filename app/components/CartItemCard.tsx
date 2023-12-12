import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import { CartItem } from "../utils/Interface";
import { theme } from "../utils/Styles";

interface CartItemCardProps {
  cartItem: CartItem;
  handleEdit: (productID: string) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({
  cartItem,
  handleEdit,
}) => {
  return (
    <View style={styles.cartItemContainer} key={cartItem.productID}>
      <View style={styles.quantityCard}>
        <Text style={styles.quantity}>{cartItem.quantity}x</Text>
      </View>
      <Image source={{ uri: cartItem.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{cartItem.name}</Text>
        <TouchableOpacity onPress={() => handleEdit(cartItem.productID)}>
          <Text>Edit</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.price}>${cartItem.price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  quantity: {
    fontSize: 14,
    color: "#888",
  },
  price: {
    fontSize: 14,
    color: theme.colors.text,
    marginRight: 10,
  },
});

export default CartItemCard;
