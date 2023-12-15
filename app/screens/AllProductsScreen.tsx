import { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../../FirebaseConfig";
import { Product } from "../utils/InterfaceUtils";
import { theme } from "../utils/StylesUtils";
import { SearchBar } from "react-native-elements";
import ProductList from "../components/ProductList";
import { MainHeader } from "../components/MainHeader";

export const AllProductsScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(FIRESTORE_DB, "products");
        const productsSnapshot = await getDocs(productsCollection);
        const fetchedProducts: Product[] = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          description: doc.data().description,
          price: doc.data().price,
          image: doc.data().image,
          discountPrice: doc.data().discountPrice,
        }));

        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const updateSearch = (text: string) => {
    if (text.valueOf() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(filtered);
    }

    setSearch(text);
  };

  return (
    <View style={styles.background}>
      <MainHeader title="Our Menu" />
      <View style={{ padding: 5 }}>
        <SearchBar
          placeholder=""
          onChangeText={updateSearch}
          value={search}
          platform="ios"
          inputStyle={{backgroundColor: theme.colors.search}}
          inputContainerStyle={{backgroundColor: theme.colors.search}}
        />
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        style={{ backgroundColor: theme.colors.background }}
      >
        <ProductList products={filteredProducts} showError/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.background,
    height: '100%',
    width: '100%'
  },
})