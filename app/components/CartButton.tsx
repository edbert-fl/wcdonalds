import { View, Text, TouchableHighlight } from 'react-native'
import React, { useContext, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { theme } from '../utils/StylesUtils'
import { useAppContext } from './AppContext'

const CartButton = () => {
  const { cartVisible, setCartVisible } = useAppContext();

  return (
    <TouchableHighlight onPress={() => { setCartVisible(true); console.log("CartButton.tsx: Cart button pressed, loading cart...")}}>
        <View>
            <Icon name="shopping-cart" size={25} color={theme.colors.text} />
        </View>
    </TouchableHighlight>
  )
}

export default CartButton