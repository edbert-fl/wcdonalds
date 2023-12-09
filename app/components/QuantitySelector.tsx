import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface QuantitySelectorProps {
    quantity: number;
    onQuantityChange: (newQuantity: number) => void;
  }

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity, onQuantityChange }) => {

  const handleSubtract = () => {
    if (quantity > 0) {
        onQuantityChange(quantity - 1);
    }
  };

  const handleAdd = () => {
    onQuantityChange(quantity + 1);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSubtract} style={styles.button}>
        <Text>-</Text>
      </TouchableOpacity>
      <View style={styles.quantityContainer}>
        <Text style={styles.quantity}>{quantity}</Text>
      </View>
      <TouchableOpacity onPress={handleAdd} style={styles.button}>
        <Text>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16
  },
  button: {
    borderWidth: 0.8,
    borderRadius: 9,
    borderColor: '#CCC',
    width: 35,
    marginLeft: 15,
    marginRight: 15,
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  quantityContainer: {
    width: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default QuantitySelector;
