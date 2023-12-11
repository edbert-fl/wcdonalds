// ProductDetails.tsx
import { RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../utils/Types";
import {
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../FirebaseConfig";
import { useEffect, useState } from "react";
import { productStyles, theme } from "../utils/Styles";
import { Divider } from "@rneui/base";
import QuantitySelector from "../components/QuantitySelector";
import AddToCartButton from "../components/AddToCartButton";
import { StackNavigationProp } from "@react-navigation/stack";
import AppHeader from "../components/AppHeader";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import Icon from "react-native-vector-icons/MaterialIcons";

type ProductDetailsRouteProp = RouteProp<RootStackParamList, "Product Details">;

interface ProductDetailsProps {
  route: ProductDetailsRouteProp;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ route }) => {
  const { productID } = route.params;
  const [productData, setProductData] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  console.log("ProductDetails.tsx: Page loaded.");

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  useEffect(() => {
    const getProductData = async () => {
      try {
        const documentRef = doc(FIRESTORE_DB, "products", productID);

        const documentSnapshot = await getDoc(documentRef);

        if (documentSnapshot.exists()) {
          const documentData = documentSnapshot.data();
          setProductData(documentData);
        } else {
          console.log("Document does not exist!");
        }
      } catch (error) {
        console.log("Error getting document: ", error);
      }
    };
    getProductData();
  }, [productID]);

  return (
    <View>
      <AppHeader
        title="WcDonald's"
        onBackPress={() => navigation.goBack()}
        onBackIcon={<Icon name="arrow-back-ios" size={20} color={theme.colors.buttonText} />}
      />
      <KeyboardAvoidingView
        style={productStyles.productInfoContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {productData ? (
          <View>
            <Image
              source={{ uri: productData.image }}
              style={productStyles.image}
            />
            <Divider width={5} color={theme.colors.divider} />
            <View style={productStyles.productInfoContainer}>
              <View style={productStyles.productTextContainer}>
                <Text style={productStyles.name}>{productData.name}</Text>
                <Text style={productStyles.price}>
                  ${productData.price.toFixed(2)}
                </Text>
                <Text style={productStyles.description}>
                  {productData.description}
                </Text>
                <QuantitySelector
                  quantity={quantity}
                  onQuantityChange={handleQuantityChange}
                />
                <AddToCartButton productID={productID} quantity={quantity} />
              </View>
            </View>
          </View>
        ) : (
          <View>
            <ShimmerPlaceholder
              style={{
                width: "100%",
                height: 180,
                marginTop: 10,
                marginBottom: 30,
              }}
            />
            <View style={productStyles.productInfoContainer}>
              <View style={productStyles.productTextContainer}>
                <ShimmerPlaceholder
                  style={{ width: 200, height: 20, marginBottom: 10 }}
                />
                <ShimmerPlaceholder
                  style={{ width: 150, height: 20, marginBottom: 30 }}
                />
                <View>
                  <ShimmerPlaceholder
                    style={{ width: 250, height: 20, marginBottom: 10 }}
                  />
                  <ShimmerPlaceholder
                    style={{ width: 250, height: 20, marginBottom: 10 }}
                  />
                </View>
                <ShimmerPlaceholder
                  style={{ width: 105, height: 35, marginVertical: 25 }}
                />
                <ShimmerPlaceholder
                  style={{ width: "100%", height: 35, marginVertical: 25 }}
                />
              </View>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};
