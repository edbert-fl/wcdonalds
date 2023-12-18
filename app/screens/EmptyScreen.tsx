import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { theme } from '../utils/StylesUtils'
import { FontAwesome } from "@expo/vector-icons";
import Icon from 'react-native-vector-icons/MaterialIcons';

const showIcon = (icon: string) => {
  switch(icon) {
    case 'shoppingCart':
      return <Icon name="remove-shopping-cart" size={50} color="#808080" />
    case 'empty':
      return <Icon name="sentiment-very-dissatisfied" size={50} color="#808080" />
  }
}

interface EmptyScreenProps {
  icon: "shoppingCart" | "empty",
  text: string,
}

export const EmptyScreen: React.FC<EmptyScreenProps> = ({ icon, text }) => {
  return (
    <View style={styles.emptyCartContainer}>
        {showIcon(icon)}
        <Text style={styles.emptyCartText}>
            {text}
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

export default EmptyScreen