import { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { Card } from "@rneui/themed";
import { FIRESTORE_DB } from "../../FirebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { cardStyles, headerStyles } from "../utils/Styles";
import { RootStackParamList } from "../utils/Types";
import { Product } from "../utils/Interface";
import AppHeader from "../components/AppHeader";
import { useCart } from "../components/CartContext";
import ConfettiCannon from 'react-native-confetti-cannon';

export const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  console.log("ProductPage.tsx: Page loaded.");

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
        }));

        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <ScrollView>
      <ProductList products={products} navigation={useNavigation()} />
    </ScrollView>
  );
};

interface ProductListProps {
  products: Product[];
  navigation: StackNavigationProp<RootStackParamList, "All Products">;
}

const ProductList: React.FC<ProductListProps> = ({ products, navigation }) => {

  const handleCardPress = (productID: string) => {
    navigation.navigate("Product Details", { productID });
  };

  return (
    <View>
      {products.map((product) => (
        <TouchableOpacity
          key={product.id}
          onPress={() => handleCardPress(product.id)}
        >
          <Card>
            <Image source={{ uri: product.image }} style={cardStyles.image} />
            <Text style={cardStyles.name}>{product.name}</Text>
            <Text style={cardStyles.description}>{product.description}</Text>
            <Text style={cardStyles.price}>
              Price: ${product.price.toFixed(2)}
            </Text>
          </Card>
        </TouchableOpacity>
      ))}
    </View>
  );
};
