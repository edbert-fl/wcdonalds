import { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { FIRESTORE_DB } from "../../FirebaseConfig";
import { Product } from "../utils/InterfaceUtils";
import { theme } from "../utils/StylesUtils";
import ProductList from "../components/ProductList";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../utils/TypesUtils";
import { Icon } from "react-native-elements";
import { isAdmin } from "../../Admin";
import { useAppContext } from "../components/AppContext";
import AppHeader from "../components/AppHeader";
import NavigationScreen from "./NavigationScreen";
import { CartScreen } from "./CartScreen";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";

type DealProductsScreenProp = RouteProp<RootStackParamList, "Deals">;

export const DealProductsScreen = () => {
  const route = useRoute<DealProductsScreenProp>();
  const { promotionID, promotionName } = route.params || {};

  const [products, setProducts] = useState<Product[]>([]);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchProducts = async () => {
      if (promotionID != "") {
        try {
          const productsCollectionRef = collection(FIRESTORE_DB, "products");
          const promotionRef = doc(FIRESTORE_DB, "promotions", promotionID);

          const productQuery = query(
            productsCollectionRef,
            where("promotion", "==", promotionRef)
          );

          const productsSnapshot = await getDocs(productQuery);
          const fetchedProducts: Product[] = productsSnapshot.docs.map(
            (doc) => ({
              id: doc.id,
              name: doc.data().name,
              description: doc.data().description,
              price: doc.data().price,
              image: doc.data().image,
              discountPrice: doc.data().discountPrice,
            })
          );

          setProducts(fetchedProducts);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }
    };

    fetchProducts();
  }, []);

  const {
    authUser,
    handleSignOut,
    menuVisible,
    setMenuVisible,
    handleOpenCart,
  } = useAppContext();

  if (authUser == null) {
    throw "Error: No user has been logged in!";
  }

  return (
    <View style={styles.background}>
      <NavigationScreen
        admin={isAdmin(authUser.uid)}
        handleSignOut={handleSignOut}
        menuVisible={menuVisible}
        setMenuVisible={(menuVisible) => setMenuVisible(menuVisible)}
      />
      <AppHeader
        title={promotionName}
        onBackIcon={<Icon name="arrow-back-ios" size={20} color={theme.colors.buttonText} />}
        onBackPress={() => navigation.goBack()}
        onRightIcon={<Icon name="shopping-cart" size={25} color="#FFFFFF" />}
        onRightPress={() => handleOpenCart()}
      />
      <CartScreen />
      {promotionID === null ? (
        <View>
          <Text>Error has occured</Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{ paddingBottom: 120 }}
          style={{ backgroundColor: theme.colors.background }}
        >
          <ProductList products={products} showError />
        </ScrollView>
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
});
