import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { MainHeader } from "../components/MainHeader";
import { useAppContext } from "../components/AppContext";
import { FIRESTORE_DB } from "../../FirebaseConfig";
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { CartItem, Order, Product } from "../utils/InterfaceUtils";
import { Card } from "@rneui/themed";
import { theme } from "../utils/StylesUtils";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../utils/TypesUtils";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import EmptyScreen from "./EmptyScreen";

export const UserProfileScreen = () => {
  const { authUser, setCart, handleOpenCart } = useAppContext();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (authUser == null) {
    throw new Error("No user has been logged in!");
  }

  useEffect(() => {
    const fetchOrderHistory = async () => {
      const tempOrders: Order[] = [];

      const ordersCollecitonRef = collection(FIRESTORE_DB, "orders");
      const queryRef = query(
        ordersCollecitonRef,
        where("orderedBy", "==", authUser.uid)
      );
      const querySnapshot = await getDocs(queryRef);

      querySnapshot.forEach((doc) => {
        tempOrders.push({
          orderID: doc.id,
          itemsInOrder: doc.data().itemsInOrder,
          orderValue: doc.data().orderValue,
          orderedAt: doc.data().orderedAt,
          orderedBy: doc.data().orderedBy,
        });
      });

      setOrders(tempOrders);
      setLoading(false);
    };
    setLoading(true);
    fetchOrderHistory();
  }, []);

  const timestampToDate = (timestamp: Timestamp) => {
    return new Date(timestamp.seconds * 1000);
  };

  const handleReorder = async (orderID: string) => {
    let cartItems: CartItem[] = [];

    try {
      const ordersCollectionRef = collection(FIRESTORE_DB, "orders");
      const orderDocumentRef = doc(ordersCollectionRef, orderID);
      const orderDocument = await getDoc(orderDocumentRef);

      console.log("\n\nDEBUG >>>", "orderDocument", orderDocument);

      if (orderDocument.exists()) {
        const orderData = orderDocument.data();
        const orderItems = orderData.itemsInOrder;

        for (let i = 0; i < orderItems.length; i++) {
          const orderItem = orderItems[i]
          const productDocument = await getDoc(orderItem.orderedItem);

          if (productDocument.exists()) {
            const productData = productDocument.data() as Product;

            const cartItem: CartItem = {
              productID: productDocument.id,
              name: productData.name,
              description: productData.description,
              price: productData.price,
              image: productData.image,
              quantity: orderItem.orderQuantity,
            };

            cartItems.push(cartItem);
          }
        }
      }

      setCart(cartItems);
      navigation.navigate("Home");
      handleOpenCart();
    } catch (error: any) {
      console.error("Error handling reorder:", error.message);
    }
  };

  return (
    <View style={styles.background}>
      <MainHeader
        title={(authUser.displayName || "Loading...") + "'s Profile"}
      />

      {loading ? (
        <View>
          <OrderHistoryPlaceholder />
          <OrderHistoryPlaceholder />
          <OrderHistoryPlaceholder />
        </View>
      ) : orders.length === 0 ? (
        <EmptyScreen icon="empty" text="Looks like you haven't made any orders yet..."/>
      ) : (
        orders.map((order) => (
          <Card containerStyle={{ borderRadius: 15 }} key={order.orderID}>
            <View style={styles.previousOrder}>
              {order.orderedAt ? (
                <View style={styles.rowAlign}>
                  <Icon
                    name="fastfood"
                    size={30}
                    color={theme.colors.success}
                    style={{ marginRight: 15, marginLeft: 10 }}
                  />
                  <View>
                    <Text style={styles.text}>Ordered on</Text>
                    <Text style={styles.text}>
                      {timestampToDate(order.orderedAt).getUTCDate()}{" "}
                      {
                        months[
                          timestampToDate(order.orderedAt).getUTCMonth() - 1
                        ]
                      }{" "}
                      {timestampToDate(order.orderedAt).getUTCFullYear()}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        handleReorder(order.orderID);
                      }}
                    >
                      <View style={[styles.rowAlign, { paddingTop: 10 }]}>
                        <Text style={styles.reorderButton}>Reorder</Text>
                        <Icon
                          name="arrow-forward"
                          size={18}
                          color={theme.colors.link}
                          style={{ marginLeft: 1 }}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <Text>No date found...</Text>
              )}
              <View>
                <Text style={styles.price}>${order.orderValue.toFixed(2)}</Text>
              </View>
            </View>
          </Card>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.background,
    height: "100%",
    width: "100%",
  },
  previousOrder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 70,
  },
  rowAlign: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: theme.colors.text,
  },
  price: {
    fontSize: 20,
    fontWeight: "500",
    color: theme.colors.text,
    marginRight: 10,
  },
  reorderButton: {
    fontSize: 16,
    color: theme.colors.link,
  },
});

export default UserProfileScreen;

const OrderHistoryPlaceholder = () => {
  return (
    <Card containerStyle={{ borderRadius: 15 }}>
      <View style={styles.previousOrder}>
        <View style={styles.rowAlign}>
          <ShimmerPlaceholder
            style={{
              width: 30,
              height: 30,
              marginRight: 15,
              marginLeft: 10,
            }}
          />
          <View>
            <ShimmerPlaceholder
              style={{ width: 50, height: 14, marginBottom: 5 }}
            />
            <ShimmerPlaceholder
              style={{ width: 150, height: 14, marginBottom: 5 }}
            />
            <ShimmerPlaceholder style={{ width: 75, height: 14 }} />
          </View>
        </View>
        <ShimmerPlaceholder
          style={{ marginRight: 10, width: 60, height: 20 }}
        />
      </View>
    </Card>
  );
};