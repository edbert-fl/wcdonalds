// ProductDetails.tsx
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from './Types'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, Image } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../FirebaseConfig';
import { useEffect, useState } from 'react';
import { productStyles, theme } from './Styles';
import { Divider } from '@rneui/base';

type ProductDetailsRouteProp = RouteProp<RootStackParamList, 'Product Details'>;

interface ProductDetailsProps {
  route: ProductDetailsRouteProp;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ route }) => {
  const { productId } = route.params;
  const [productData, setProductData] = useState<any>(null);

    useEffect(() => {
        const getProductData = async () => {
                try {
                    console.log("Getting Product Data :)")
                    const documentRef = doc(FIRESTORE_DB, "products", productId)

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
        }, [productId]);

    return (
        <SafeAreaView style={productStyles.productPageContainer}>
            {productData ? (
                <View>
                    <Image source={{ uri: productData.image }} style={productStyles.image} />
                    <Divider width={5} color={theme.colors.divider}/>
                    <View style={productStyles.productInfoContainer}>
                        <Text style={productStyles.name}>{productData.name}</Text>
                        <Text style={productStyles.price}>${productData.price.toFixed(2)}</Text>
                        <Text style={productStyles.description}>{productData.description}</Text>
                    </View>
                </View>
                ) : (
                <Text>Loading...</Text>
            )}
        </SafeAreaView>
    );
};
