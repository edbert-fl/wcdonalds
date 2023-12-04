import { useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet, Image } from 'react-native';
import { collection, getDocs } from "firebase/firestore";
import { Card } from '@rneui/themed';
import { FIRESTORE_DB } from "../../FirebaseConfig";

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
  }

const ProductList: React.FC<{ products: Product[] }> = ({ products }) => (
    <View>
      {products.map(product => (
        <Card>
        <Image source={{ uri: product.image }} style={styles.image} />
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>Price: ${product.price.toFixed(2)}</Text>
        </Card>
      ))}
    </View>
  );
  
export function ProductPage() {
    const [products, setProducts] = useState<Product[]>([]);
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const productsCollection = collection(FIRESTORE_DB, 'products');
          const productsSnapshot = await getDocs(productsCollection);
          const fetchedProducts: Product[] = productsSnapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            price: doc.data().price,
            image: doc.data().image
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
        <ProductList products={products} />
      </ScrollView>
    );
  }

  const styles = StyleSheet.create({
    image: {
      width: '100%',
      height: 200,
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    description: {
      fontSize: 14,
      color: '#555',
      marginBottom: 4,
    },
    price: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#E65100',
    },
  });
    