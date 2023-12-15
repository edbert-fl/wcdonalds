import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Text, Image } from "react-native";
import { Icon } from "react-native-elements";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import { Product } from "../utils/InterfaceUtils";
import { theme } from "../utils/StylesUtils";
import { RootStackParamList } from "../utils/TypesUtils";
import { Card } from "@rneui/themed";

interface ProductListProps {
    products: Product[];
    showError: boolean;

    // To tell the search bar that an item has been selected.
    setSearchComplete?: (searchComplete: boolean) => void | null;
  }
  
  const ProductList: React.FC<ProductListProps> = ({ products, showError, setSearchComplete=null }) => {
    const DESCRIPTION_MAX_LENGTH = 90;
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [noProductFound, setNoProductFound] = useState(false);
  
    let timeout;
    useEffect(() => {
      if (products.length === 0) {
        timeout = setTimeout(() => {
          setNoProductFound(true);
        }, 5000);
      } else {
        setNoProductFound(false);
      }
    }, []);
  
    const handleCardPress = (productID: string) => {
      if (setSearchComplete != null) {
        setSearchComplete(true);
        console.log("Search Completed")
      }
      navigation.navigate("ProductDetails", { productID });
    };
  
    const shortenDescription = (description: string) => {
      if (description.length > DESCRIPTION_MAX_LENGTH) {
        return description.substring(0, DESCRIPTION_MAX_LENGTH) + "...";
      }
      return description;
    };
  
    return (
      <View>
        {products.length === 0 ? (
          noProductFound ? (
            showError ? (
            <View style={styles.errorContainer}>
              <Icon
                name="mood-bad"
                size={55}
                color={theme.colors.placeholderText}
              />
              <Text style={styles.errorText}>
                Sorry, we couldn't find what you were looking for...
              </Text>
            </View>
            ) : (
                null
            )
          ) : (
            // Shimmer place holder for when loading
            <View>
              <Card>
                <View style={styles.card}>
                  <ShimmerPlaceholder style={styles.image} />
                  <View style={styles.cardText}>
                    <ShimmerPlaceholder
                      style={{ width: 80, marginTop: 10, marginBottom: 10 }}
                    />
                    <ShimmerPlaceholder
                      style={{ width: 200, height: 40, marginBottom: 10 }}
                    />
                    <ShimmerPlaceholder
                      style={{ width: 32, maginVertical: 10 }}
                    />
                  </View>
                </View>
              </Card>
              <Card>
                <View style={styles.card}>
                  <ShimmerPlaceholder style={styles.image} />
                  <View style={styles.cardText}>
                    <ShimmerPlaceholder
                      style={{ width: 80, marginTop: 10, marginBottom: 10 }}
                    />
                    <ShimmerPlaceholder
                      style={{ width: 200, height: 40, marginBottom: 10 }}
                    />
                    <ShimmerPlaceholder
                      style={{ width: 32, maginVertical: 10 }}
                    />
                  </View>
                </View>
              </Card>
              <Card>
                <View style={styles.card}>
                  <ShimmerPlaceholder style={styles.image} />
                  <View style={styles.cardText}>
                    <ShimmerPlaceholder
                      style={{ width: 80, marginTop: 10, marginBottom: 10 }}
                    />
                    <ShimmerPlaceholder
                      style={{ width: 200, height: 40, marginBottom: 10 }}
                    />
                    <ShimmerPlaceholder
                      style={{ width: 32, maginVertical: 10 }}
                    />
                  </View>
                </View>
              </Card>
            </View>
          )
        ) : (
          <View>
            {products.map((product) => (
              <TouchableOpacity
                key={product.id}
                onPress={() => handleCardPress(product.id)}
              >
                <Card containerStyle={{ borderWidth: 0 }}>
                  <View style={styles.card}>
                    <Image source={{ uri: product.image }} style={styles.image} />
                    <View style={styles.cardText}>
                      <Text style={styles.name}>{product.name}</Text>
                      <Text style={styles.description}>
                        {shortenDescription(product.description)}
                      </Text>
                      {product.discountPrice ? (
                        <View style={{ flexDirection: "row" }}>
                          <Text style={[styles.price, styles.beforeDiscount]}>
                            ${product.price.toFixed(2)}
                          </Text>
                          <Text style={styles.price}>
                            ${product.discountPrice.toFixed(2)}
                          </Text>
                        </View>
                      ) : (
                        <Text style={styles.price}>
                          ${product.price.toFixed(2)}
                        </Text>
                      )}
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

export default ProductList;

  export const styles = StyleSheet.create({
    card: {
      flexDirection: "row",
      alignContent: "center",
      width: "79%",
    },
    cardText: {
      marginLeft: 12,
    },
    image: {
      marginTop: 10,
      width: 70,
      height: 70,
    },
    name: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 4,
    },
    description: {
      fontSize: 14,
      color: theme.colors.text,
      marginBottom: 4,
    },
    price: {
      fontSize: 17,
      fontWeight: "bold",
      color: theme.colors.primary,
    },
    beforeDiscount: {
      fontWeight: "normal",
      color: theme.colors.placeholderText,
      textDecorationLine: "line-through",
      textDecorationStyle: "solid",
      marginRight: 5,
    },
    errorContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      height: "100%",
      width: "70%",
      marginTop: 30
    },
    errorText: {
      fontSize: 18,
      marginTop: 10,
      textAlign: "center",
      color: theme.colors.placeholderText,
    },
  });
  