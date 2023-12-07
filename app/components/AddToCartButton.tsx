import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useCart } from "./CartContext";
import { collection, doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../FirebaseConfig";
import { CartItem } from "../utils/Interface";

interface AddToCartButtonProps {
  productID: string;
  quantity: number;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  productID,
  quantity,
}) => {
  const { cart, setCart } = useCart();

  function mapDataToProduct(
    productID: string,
    quantity: number,
    data: any
  ): CartItem | null {
    if (data) {
      const cartItem = {
        productID: productID,
        name: data.name,
        description: data.price,
        price: data.price,
        image: data.image,
        quantity: quantity,
      };
      return cartItem;
    } else {
      return null;
    }
  }

  const fetchCartProduct = async (productID: string, quantity: number) => {
    try {
      const productDocRef = doc(
        collection(FIRESTORE_DB, "products"),
        productID
      );
      const productDoc = await getDoc(productDocRef);

      if (productDoc.exists()) {
        const productData = productDoc.data();
        const result = mapDataToProduct(productID, quantity, productData);
        return result;
      } else {
        console.log(`Product with ID ${productID} not found.`);
        return null;
      }
    } catch (error) {
      console.error("Error fetching cart products:", error);
    }
  };

  function handleAddToCart(productID: string, quantity: number) {
    console.log(
      "AddToCartButton.tsx: Adding to cart >>>",
      { productID, quantity },
      "\n"
    );

    fetchCartProduct(productID, quantity)
      .then((fetchedProduct) => {
        if (fetchedProduct) {
          const existingItemIndex = cart.findIndex(
            (item) => item.productID === productID
          );

          if (existingItemIndex !== -1) {
            console.log(
              "Cart.tsx: Duplicate item found. Adding quantities..."
            );
            let tempCart = [...cart]; // Create a copy of the cart
            tempCart[existingItemIndex].quantity += quantity;
            setCart(tempCart);
          } else {
            console.log(
              "Cart.tsx: No duplicate item found. Adding item to cart..."
            );
            setCart((prevCart) => [...prevCart, fetchedProduct]);
          }
        } else {
          console.error("Product not found or fetch failed.");
        }
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });
  }

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => handleAddToCart(productID, quantity)}
    >
      <Text style={styles.buttonText}>Add to Cart</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4CAF50", // Green color, you can change it to match your theme
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddToCartButton;
