import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { useCart } from "./CartContext";
import { collection, doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../FirebaseConfig";
import { CartItem } from "../utils/Interface";
import { cartStyles } from "../utils/Styles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../utils/Types";
import AddToCartAnimation from "./AddToCartAnimation";

interface AddToCartButtonProps {
  productID: string;
  quantity: number;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  productID,
  quantity,
}) => {
  const { cart, setCart } = useCart();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

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
              "AddToCartButton.tsx: Duplicate item found."
            );
            if (quantity === 0) {
              console.log(
                "AddToCartButton.tsx: Removing item..."
              );
              let tempCart = [...cart];
              tempCart = tempCart.filter((_, index) => index !== existingItemIndex);
              setCart(tempCart);
              navigation.navigate('Success', { successText: "Item removed from cart.", includeConfetti: false, animation: null});
            } else {
              console.log(
                "AddToCartButton.tsx: Updating item quantity..."
              );
              let tempCart = [...cart];
              tempCart[existingItemIndex].quantity = quantity;
              setCart(tempCart);
              navigation.navigate('Success', { successText: "Item quantity updated!", includeConfetti: false, animation: null });
            }
          } else {
            console.log(
              "AddToCartButton.tsx: No duplicate item found. Adding item to cart..."
            );
            setCart((prevCart) => [...prevCart, fetchedProduct]);
            navigation.navigate('Success', { successText: "Item added to cart!", includeConfetti: true, animation: <AddToCartAnimation/> });
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
    quantity === 0 ? (
      <TouchableOpacity style={cartStyles.removeButton} onPress={() => handleAddToCart(productID, quantity)}>
        <Text style={cartStyles.buttonText}>Remove from Cart</Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity style={cartStyles.button} onPress={() => handleAddToCart(productID, quantity)}>
        <Text style={cartStyles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    )
  );
};

export default AddToCartButton;
