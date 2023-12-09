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
import { cartStyles, headerStyles } from "../utils/Styles";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../utils/Types";
import { Card } from "@rneui/themed";
import AppHeader from "../components/AppHeader";

export const Cart = () => {
  const { cart, setCart, cartVisible, setCartVisible } = useCart();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleEdit = (productID: string) => {
    console.log("Cart.tsx: Editing product >>>", productID);
    setCartVisible(false);
    navigation.navigate("Product Details", { productID: productID });
  };

  function calculateTotaPrice() {
    let sum = 0;
    for(let index in cart) {
        sum += (cart[index].price * cart[index].quantity);
    }
    return sum;
  }

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
        <AppHeader 
          title="Cart"
          onBackPress={() => setCartVisible(false)}
          onBackIcon="X"/>
        {cart.length === 0 ? (
          <View style={cartStyles.emptyCartContainer}>
            <FontAwesome name="shopping-cart" size={50} color="#808080" />
            <Text style={cartStyles.emptyCartText}>
              Your cart looks empty...
            </Text>
          </View>
        ) : (
          <ScrollView style={cartStyles.cartContainer}>
            <View style={{height: 30}}/>
            {cart.map((cartItem) => (
              <View
                style={cartStyles.cartItemContainer}
                key={cartItem.productID}
              >
                <View style={cartStyles.quantityCard}>
                    <Text style={cartStyles.quantity}>
                        {cartItem.quantity}x
                    </Text>
                </View>
                <Image
                  source={{ uri: cartItem.image }}
                  style={cartStyles.image}
                />
                <View style={cartStyles.textContainer}>
                    <Text style={cartStyles.name}>{cartItem.name}</Text>
                    <TouchableOpacity
                    onPress={() => handleEdit(cartItem.productID)}
                    >
                        <Text>Edit</Text>
                    </TouchableOpacity>
                </View>
                <View> 
                    <Text style={cartStyles.price}>
                        ${cartItem.price}
                    </Text>
                </View>
              </View>
            ))}
            <View style={cartStyles.cartFooter}>
                <View style={cartStyles.totalPriceContainer}>
                    <Text style={cartStyles.totalText}>Total</Text>
                    <Text style={cartStyles.totalPrice}> ${calculateTotaPrice()}</Text>
                </View>
                <TouchableOpacity style={cartStyles.button} onPress={() => {alert("Check out completed!"); setCartVisible(false); navigation.navigate("All Products");}}>
                    <Text style={cartStyles.buttonText}>Checkout</Text>
                </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </Modal>
    </SafeAreaView>
  );
};
