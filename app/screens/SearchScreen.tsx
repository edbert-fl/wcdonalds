import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../../FirebaseConfig";
import { Product } from "../utils/InterfaceUtils";
import { theme } from "../utils/StylesUtils";
import ProductList from "../components/ProductList";
import Modal from "react-native-modal";

interface SearchPageProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  search: string;
  setSearch: (search: string) => void;
}

const SearchScreen: React.FC<SearchPageProps> = ({
  visible,
  setVisible,
  search,
  setSearch,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchComplete, setSearchComplete] = useState(false);

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

  useEffect(() => {
    if (searchComplete) {
      setVisible(false);
    }
  }, [searchComplete]);

  useEffect(() => {
    updateSearch(search);
  }, [search]);

  const updateSearch = (text: string) => {
    if (text.valueOf() === "") {
      setFilteredProducts([]);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(filtered);
    }

    setSearch(text);
  };

  return (
    <Modal
      style={styles.cart}
      isVisible={visible}
      animationIn="fadeIn"
      animationOut="fadeOut"
      hasBackdrop={false}
      coverScreen={false}
    >
      <ProductList
        products={filteredProducts}
        showError={false}
        setSearchComplete={setSearchComplete}
      />
    </Modal>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  cart: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: theme.colors.background,
    width: "100%",
    margin: 0,
    marginTop: 160
  },
});
