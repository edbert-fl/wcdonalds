import { View, Text, TouchableHighlight } from 'react-native'
import React, { useContext, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { theme } from '../utils/Styles'
import { useCart } from './CartContext'

const CartButton = () => {
  const { cartVisible, setCartVisible } = useCart();

  return (
    <TouchableHighlight onPress={() => { setCartVisible(true); console.log("Cart button pressed")}}>
        <View>
            <Icon name="shopping-cart" size={25} color={theme.colors.text} />
        </View>
    </TouchableHighlight>
  )
}

export default CartButton