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
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../utils/Types";
import Modal from "react-native-modal";
import AppHeader from "../components/AppHeader";
import Icon from "react-native-vector-icons/MaterialIcons";
import AddressForm from "../components/AddressForm";

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
          <View style={styles.emptyCartContainer}>
            <FontAwesome name="shopping-cart" size={50} color="#808080" />
            <Text style={styles.emptyCartText}>
              Your cart looks empty...
            </Text>
          </View>
        ) : (
          <ScrollView style={styles.cartContainer}>
            <View style={{ height: 30 }} />
            <AddressForm addressSheetVisible={addressSheetVisible} setAddressSheetVisible={setAddressSheetVisible}/>
            <View style={styles.cartItemContainer}>
              <View style={styles.addressContainer}>
                <Text style={styles.title}>Address</Text>
                { address ? (
                  <Text style={styles.address}>{address.address?.line1}, {address.address?.city}</Text>
                ) : (
                  <Text>No address saved</Text>
                )}
                
              </View>
              <View>
                <TouchableOpacity onPress={() => setAddressSheetVisible(true)}>
                  <Text>Edit address</Text>
                </TouchableOpacity>
              </View>
            </View>
            {cart.map((cartItem) => (
              <View
                style={styles.cartItemContainer}
                key={cartItem.productID}
              >
                <View style={styles.quantityCard}>
                  <Text style={styles.quantity}>{cartItem.quantity}x</Text>
                </View>
                <Image
                  source={{ uri: cartItem.image }}
                  style={styles.image}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{cartItem.name}</Text>
                  <TouchableOpacity
                    onPress={() => handleEdit(cartItem.productID)}
                  >
                    <Text>Edit</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={styles.price}>${cartItem.price}</Text>
                </View>
              </View>
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
                  navigation.navigate('Checkout');
                }}
              >
                <Text style={styles.buttonText}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </Modal>
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
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '30%'
  },
  emptyCartText: {
    fontSize: 18,
    marginTop: 10,
    color: theme.colors.placeholderText,
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
  address: {
    fontSize: 14,
    color: theme.colors.text,
    marginRight: 10
  },
  price: {
    fontSize: 14,
    color: theme.colors.text,
    marginRight: 10
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
  addressContainer: {
    flex: 1,
    marginLeft: 15
  }
});