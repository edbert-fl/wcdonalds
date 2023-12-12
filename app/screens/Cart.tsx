import {
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  View,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import React, { useEffect, useState } from "react";
import { useCart } from "../components/CartContext";
import { CartItem } from "../utils/Interface";
import { theme } from "../utils/Styles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../utils/Types";
import Modal from "react-native-modal";
import AppHeader from "../components/AppHeader";
import Icon from "react-native-vector-icons/MaterialIcons";
import AddressForm from "../components/AddressForm";
import EmptyCart from "./EmptyCart";
import AddressCard from "../components/AddressCard";
import CartItemCard from "../components/CartItemCard";
import { StripeProvider } from "@stripe/stripe-react-native";

export const Cart = () => {
  const { cart, setCart, address, cartVisible, setCartVisible } = useCart();
  const [addressSheetVisible, setAddressSheetVisible] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleEdit = (productID: string) => {
    console.log("Cart.tsx: Editing product >>>", productID);
    setCartVisible(false);
    navigation.navigate("Product Details", { productID: productID });
  };

  function calculateTotaPrice() {
    let sum = 0;
    for (let index in cart) {
      sum += cart[index].price * cart[index].quantity;
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
      <StripeProvider
        publishableKey="pk_test_51OLi9NBXTkgpeHauX2lreJTh4jHBZt76XK5CjfdkYAj5c78DVAjfDPdJ65w6S7ZPhr1hxRhPgVRihLDOj4YgOTwd00gTTLqlgf"
        urlScheme="your-url-scheme"
        merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
      >
      <Modal
        isVisible={cartVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        coverScreen
        style={{width: '100%', margin: 0}}
        hasBackdrop
        backdropOpacity={1}
        backdropColor={theme.colors.background}
      >
        <AppHeader
          title="Cart"
          onBackPress={() => setCartVisible(false)}
          onBackIcon={<Icon name="arrow-back-ios" size={20} color={theme.colors.buttonText} />}
        />
        {cart.length === 0 ? (
          <EmptyCart/>
        ) : (
          <ScrollView style={styles.cartContainer}>
            <View style={{ height: 30 }} />
            <AddressForm addressSheetVisible={addressSheetVisible} setAddressSheetVisible={setAddressSheetVisible}/>
            <AddressCard address={address} setAddressSheetVisible={setAddressSheetVisible}/>
            {cart.map((cartItem) => (
              <CartItemCard cartItem={cartItem} handleEdit={handleEdit}/>
            ))}
            <View style={styles.cartFooter}>
              <View style={styles.totalPriceContainer}>
                <Text style={styles.totalText}>Total</Text>
                <Text style={styles.totalPrice}>
                  {" "}
                  ${calculateTotaPrice()}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  alert("Checkout completed!")
                }}
              >
                <Text style={styles.buttonText}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </Modal>
      </StripeProvider>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  cart: {
      flex: 1,
      backgroundColor: theme.colors.surface,
      borderCurve: 10
  },
  cartContainer: {
    height: '100%',
    backgroundColor: theme.colors.background
  },
  button: {
    backgroundColor: theme.colors.success, 
    marginTop: 15,
    width: '100%',
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  removeButton: {
    backgroundColor: theme.colors.warning, // Green color, you can change it to match your theme
    marginTop: 15,
    width: '100%',
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  cartFooter: {
    alignItems: "center",
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%',
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
    width: '100%'
  },
  totalText: {
    fontSize: 16
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: '600'
  },
});