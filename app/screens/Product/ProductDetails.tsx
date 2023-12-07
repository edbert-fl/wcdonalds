// ProductDetails.tsx
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../utils/Types';
import { Text, View, Image, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../../FirebaseConfig';
import { useEffect, useState } from 'react';
import { productStyles, theme } from '../../utils/Styles';
import { Divider } from '@rneui/base';
import QuantitySelector from '../../components/QuantitySelector';
import AddToCartButton from '../../components/AddToCartButton';

type ProductDetailsRouteProp = RouteProp<RootStackParamList, 'Product Details'>;

interface ProductDetailsProps {
    route: ProductDetailsRouteProp;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ route }) => {
    const { productID } = route.params;
    const [productData, setProductData] = useState<any>(null);

    useEffect(() => {
        const getProductData = async () => {
            try {
                const documentRef = doc(FIRESTORE_DB, "products", productID)

                const documentSnapshot = await getDoc(documentRef);

                if (documentSnapshot.exists()) {
                    const documentData = documentSnapshot.data();
                    console.log("DocumentData: ", documentData)
                    setProductData(documentData);
                } else {
                    console.log("Document does not exist!");
                }
            } catch (error) {
                console.log("Error getting document: ", error);
            }
        }
        getProductData();
    }, [productID]);

    return (
        <KeyboardAvoidingView style={productStyles.productInfoContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            {productData ? (
                <View>
                    <Image source={{ uri: productData.image }} style={productStyles.image} />
                    <Divider width={5} color={theme.colors.divider} />
                    <View style={productStyles.productInfoContainer}>
                        <View style={productStyles.productTextContainer}>
                            <Text style={productStyles.name}>{productData.name}</Text>
                            <Text style={productStyles.price}>${productData.price.toFixed(2)}</Text>
                            <Text style={productStyles.description}>{productData.description}</Text>
                            <QuantitySelector/>
                            <AddToCartButton productID={productID} orderQty={1}/>
                        </View>
                    </View>
                </View>
            ) : (
                <ActivityIndicator size="large" color={theme.colors.accent} />
            )}
        </KeyboardAvoidingView>
    );
};
