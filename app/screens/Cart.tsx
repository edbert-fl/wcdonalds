import {
  SafeAreaView,
  ScrollView,
  Text,
  Modal,
  Pressable,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useCart } from "../components/CartContext";
import { CartItem } from "../utils/Interface";
import { cartStyles } from "../utils/Styles";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../utils/Types";

export const Cart = () => {
  const { cart, setCart, cartVisible, setCartVisible } = useCart();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleEdit = (productID: string) => {
    console.log("Cart.tsx: Editing product >>>", productID);
    setCartVisible(false);
    navigation.navigate('Product Details', { productID: productID });
};

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
          style={cartStyles.upper}
          onPress={() => {
            setCartVisible(false);
          }}
        ></Pressable>
        {cart.length === 0 ? (
            <View style={cartStyles.emptyCartContainer}>
                <FontAwesome name="shopping-cart" size={50} color="#808080" />
                <Text style={cartStyles.emptyCartText}>Your cart looks empty...</Text>
            </View>
          ) : (
        <ScrollView>
          {cart.map((cartItem) => (
            <View style={cartStyles.cartItemContainer} key={cartItem.productID}>
              <Image
                source={{ uri: cartItem.image }}
                style={cartStyles.image}
              />
              <View style={cartStyles.textContainer}>
                <Text style={cartStyles.name}>{cartItem.name}</Text>
                <Text style={cartStyles.quantity}>
                  Quantity: {cartItem.quantity}
                </Text>
              </View>
              <TouchableOpacity onPress={() => handleEdit(cartItem.productID)}>
                <Text>Edit</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
          )}
      </Modal>
    </SafeAreaView>
  );
};
