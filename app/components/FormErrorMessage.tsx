import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { theme } from '../utils/StylesUtils';

interface FormErrorMessageProps {
    visible: boolean;
    message: string;
}

const FormErrorMessage: React.FC<FormErrorMessageProps> = ({ visible, message }) => {
  return (
    <View style={styles.warningBox}>
      {
        visible ? (
            <Text style={styles.errorWarning}>{message}</Text>
        ) : (
            null
        )
    }
    </View>
  )
}

const styles = StyleSheet.create({
    errorWarning: {
        color: theme.colors.error
    },
    warningBox: {
        marginTop: 5,
    }
})

export default FormErrorMessage