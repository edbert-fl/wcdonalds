import {
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  Platform
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../components/AppContext";
import { CartItem, OrderItem } from "../utils/InterfaceUtils";
import { theme } from "../utils/StylesUtils";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../utils/TypesUtils";
import Modal from "react-native-modal";
import AppHeader from "../components/AppHeader";
import Icon from "react-native-vector-icons/MaterialIcons";
import AddressForm from "../components/AddressForm";
import EmptyScreen from "./EmptyScreen";
import AddressCard from "../components/AddressCard";
import CartItemCard from "../components/CartItemCard";
import { StripeProvider } from "@stripe/stripe-react-native";
import { collection, doc, addDoc, Timestamp } from "firebase/firestore";
import { FIRESTORE_DB } from "../../FirebaseConfig";

export const CartScreen = () => {
  const { authUser, cart, setCart, address, cartVisible, setCartVisible } = useAppContext();
  const [addressSheetVisible, setAddressSheetVisible] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  if (authUser == null) {
    throw new Error("Error: User cannot be null!")
  }

  const handleEdit = (productID: string) => {
    setCartVisible(false);
    navigation.navigate("ProductDetails", { productID: productID });
  };

  const handleCheckOut = () => {
    const ordersCollecitonRef = collection(FIRESTORE_DB, "orders");
    // const orderItemsCollectionRef = collection(FIRESTORE_DB, "orderItems");
    const productCollectionRef = collection(FIRESTORE_DB, "products");

    let newOrderItems: OrderItem[] = [];
    let orderValue = 0;

    for (let i in cart) {
      const productDocumentRef = doc(productCollectionRef, cart[i].productID);

      const newOrderItem: OrderItem = {
        orderQuantity: cart[i].quantity,
        orderedItem: productDocumentRef,
      };

      orderValue += cart[i].price * cart[i].quantity;
      newOrderItems.push(newOrderItem);
      // addDoc(orderItemsCollectionRef, newOrderItem);
    }

    addDoc(ordersCollecitonRef, {
      itemsInOrder: newOrderItems,
      orderValue: orderValue,
      orderedAt: Timestamp.now(),
      orderedBy: authUser.uid,
    });

    setCartVisible(false);
    navigation.navigate('Success', { successText: "Checkout Completed!", includeConfetti: true, animation: "addToCart" });
    setCart([]);
  };

  function calculateTotaPrice() {
    let sum = 0;
    for (let index in cart) {
      sum += cart[index].price * cart[index].quantity;
    }
    return sum.toFixed(2);
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
  }, [cart]);

  return (
    <View>
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
          short={Platform.OS === "android" ? (true) : (false)}
        />
        {cart.length === 0 ? (
          <EmptyScreen icon="shoppingCart" text="Your cart looks empty..."/>
        ) : (
          <ScrollView style={styles.cartContainer}>
            <View style={{ height: 30 }} />
            <AddressForm addressSheetVisible={addressSheetVisible} setAddressSheetVisible={setAddressSheetVisible}/>
            <AddressCard address={address} setAddressSheetVisible={setAddressSheetVisible}/>
            {cart.map((cartItem) => (
              <CartItemCard key={cartItem.productID} cartItem={cartItem} handleEdit={handleEdit}/>
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
                onPress={handleCheckOut}
              >
                <Text style={styles.buttonText}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </Modal>
      </StripeProvider>
    </View>
  );
};

export const styles = StyleSheet.create({
  cart: {
      flex: 1,
      backgroundColor: theme.colors.surface,
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