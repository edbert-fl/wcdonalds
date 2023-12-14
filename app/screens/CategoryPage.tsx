import { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { FIRESTORE_DB } from "../../FirebaseConfig";
import { Product } from "../utils/Interface";
import { theme } from "../utils/Styles";
import ProductList from "../components/ProductList";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../utils/Types";

type CategoryPageRouteProp = RouteProp<RootStackParamList, "Category">;

export const CategoryPage = () => {
  const route = useRoute<CategoryPageRouteProp>();
  const { categoryID } = route.params || {};

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (categoryID != "") {
        try {
          const productsCollectionRef = collection(FIRESTORE_DB, "products");
          const categoryRef = doc(FIRESTORE_DB, "category", categoryID);

          const productQuery = query(
            productsCollectionRef,
            where("category", "==", categoryRef)
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

  return (
    <View style={styles.background}>
      {categoryID === null ? (
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
