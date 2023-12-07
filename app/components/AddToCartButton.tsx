import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useCart } from './CartContext';

interface AddToCartButtonProps {
    productID: string;
    orderQty: number;
  }

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ productID, orderQty }) => {
    const { cart, setCart } = useCart()

    function handleAddToCart(productID: string, orderQty: number) {
        console.log('Adding to cart:', { productID, orderQty });
        setCart((prevCart) => [...prevCart, { productID, orderQty }]);
    }

    return (
        <TouchableOpacity style={styles.button} onPress={() => handleAddToCart(productID, orderQty)}>
            <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4CAF50', // Green color, you can change it to match your theme
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddToCartButton;
