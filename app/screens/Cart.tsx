import { SafeAreaView, View, Text, Modal, Pressable } from 'react-native'
import React, { useContext } from 'react'
import { cartPage } from './Styles'
import { useCart } from '../components/CartContext'

export const Cart = () => {
  const { cartVisible, setCartVisible } = useCart();

  return (
    <SafeAreaView>
        <Modal visible={cartVisible} animationType="slide">
            <Pressable style={cartPage.upper} onPress={() => {setCartVisible(false)}}></Pressable>
            <View style={cartPage.lower}>
                <Text>Cart placeholder</Text>
            </View>
        </Modal>
    </SafeAreaView>
  )
}