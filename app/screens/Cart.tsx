import { SafeAreaView, ScrollView, StyleSheet, Text, Modal, Pressable, Image, View } from "react-native";
import React, { useEffect, useState } from "react";
import { cardStyles, cartPage } from "../utils/Styles";
import { useCart } from "../components/CartContext";
import { FIRESTORE_DB } from "../../FirebaseConfig";
import { collection, doc, getDoc } from "firebase/firestore";
import { Product } from "../utils/Interface";

export const Cart = () => {
    const { cart, cartVisible, setCartVisible } = useCart();
    const [inCart, setInCart] = useState<any[]>([]);

    useEffect(() => {
        function mapDataToProduct(productID: string, quantity: number, data: any): Product | null {
            if (data) {
                const product = {
                    id: productID,
                    name: data.name,
                    description: data.price,
                    price: data.price,
                    image: data.image,
                    quantity: quantity
                };
                return product;
            } else {
                return null;
            }
        }

        const fetchCartProducts = async (cartItem: any) => {
            try {
                const productDocRef = doc(collection(FIRESTORE_DB, "products"), cartItem.productID);
                const productDoc = await getDoc(productDocRef);

                if (productDoc.exists()) {
                    const productData = productDoc.data();
                    const result = mapDataToProduct(cartItem.productID, cartItem.orderQty, productData);
                    return result;
                } else {
                    console.log(`Product with ID ${cartItem.productID} not found.`);
                    return null;
                }
            } catch (error) {
                console.error("Error fetching cart products:", error);
            }
        };

        const fetchDataForCart = async () => {
            try {
                const productDetails = await Promise.all(
                    cart.map(async (cartItems) => {
                        try {
                            console.log("Fetching products...")
                            const fetchedProduct = await fetchCartProducts(cartItems);
                            console.log(fetchedProduct);
                            setInCart((prevInCart) => [...prevInCart, fetchedProduct]);
                        } catch (error) {
                            console.error('Error:', error);
                        }
                    })
                );
            } catch (error) {
                console.error("Error fetching cart products:", error);
            }
        };

        fetchDataForCart();
    }, [cart]);

    return (
        <SafeAreaView>
            <Modal visible={cartVisible} animationType="slide">
                <Pressable
                    style={cartPage.upper}
                    onPress={() => {
                        setCartVisible(false);
                    }}
                ></Pressable>
                <ScrollView>
                    {inCart.map((cartItem) => (
                        <View style={styles.cartItemContainer} key={cartItem.id}>
                            <Image source={{ uri: cartItem.image }} style={styles.image} />
                            <View style={styles.textContainer}>
                                <Text style={styles.name}>{cartItem.name}</Text>
                                <Text style={styles.quantity}>Quantity: {cartItem.quantity}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    cartItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: {
        width: 80,
        height: 80,
        marginRight: 10,
        borderRadius: 4,
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    quantity: {
        fontSize: 14,
        color: '#888',
    },
});
