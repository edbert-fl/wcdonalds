import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { theme } from '../utils/Styles'
import { FontAwesome } from "@expo/vector-icons";

export const EmptyCart = () => {
  return (
    <View style={styles.emptyCartContainer}>
        <FontAwesome name="shopping-cart" size={50} color="#808080" />
        <Text style={styles.emptyCartText}>
            Your cart looks empty...
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    emptyCartContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '30%'
      },
      emptyCartText: {
        fontSize: 18,
        marginTop: 10,
        color: theme.colors.placeholderText,
      },
})

export default EmptyCart