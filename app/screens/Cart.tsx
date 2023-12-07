import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Modal,
  Pressable,
  Image,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { cardStyles, cartPage } from "../utils/Styles";
import { useCart } from "../components/CartContext";
import { FIRESTORE_DB } from "../../FirebaseConfig";
import { collection, doc, getDoc } from "firebase/firestore";
import { CartItem } from "../utils/Interface";

export const Cart = () => {
  const { cart, setCart, cartVisible, setCartVisible } = useCart();

  useEffect(() => {
    function mapDataToProduct(
      productID: string,
      quantity: number,
      data: any
    ): CartItem | null {
      if (data) {
        const product = {
          productID: productID,
          name: data.name,
          description: data.price,
          price: data.price,
          image: data.image,
          quantity: quantity,
        };
        return product;
      } else {
        return null;
      }
    }

    console.log("Cart.tsx: cart >>>", cart);
  }, [cart]);

  return (
    <SafeAreaView>
      <Modal visible={cartVisible} animationType="slide">
        <Pressable
          style={cartPage.upper}
          onPress={() => {
            setCartVisible(false);
          }}
        ></Pressable>
        <ScrollView>
          {cart.map((cartItem) => (
            <View style={styles.cartItemContainer} key={cartItem.productID}>
              <Image source={{ uri: cartItem.image }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.name}>{cartItem.name}</Text>
                <Text style={styles.quantity}>
                  Quantity: {cartItem.quantity}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cartItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
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
});
