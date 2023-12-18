import { View, Text, TouchableOpacity, GestureResponderEvent, StyleSheet } from 'react-native'
import React, { ReactNode } from 'react'
import { useNavigation } from '@react-navigation/native';
import { theme } from '../utils/StylesUtils';
import { SafeAreaView } from 'react-native-safe-area-context';

interface HeaderProps {
    title: string;
    onBackPress?: () => void;
    onBackIcon?: string | ReactNode;
    onRightPress?: () => void;
    onRightIcon?: string | ReactNode;
    short?: boolean
}

const Header: React.FC<HeaderProps> = ({ title, onBackPress, onRightPress, onBackIcon, onRightIcon, short=false }) => {
    return (
        <View>
            <View style={short ? (styles.shortHeader) : (styles.header)}>
                {onBackPress ? (
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={onBackPress}
                        hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                        {typeof onBackIcon === 'string' || null ? (
                            <Text style={styles.buttonIcon}>{onBackIcon || 'Back'}</Text>
                        ) : (
                            onBackIcon
                        )}
                    </TouchableOpacity>
                ) : (
                    <View style={{ flex: 1, width: '20%' }} />
                )}
                <View style={styles.headerCenterContainer}>
                    <Text style={styles.headerText}>{title}</Text>
                </View>
                {onRightPress ? (
                    <TouchableOpacity
                        style={styles.rightButton}
                        onPress={onRightPress}
                        hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                        {typeof onRightIcon === 'string' || null ? (
                            <Text style={styles.buttonIcon}>{onRightIcon || 'Next'}</Text>
                        ) : (
                            onRightIcon
                        )}
                    </TouchableOpacity>
                ) : (
                    <View style={{ flex: 1, width: '20%' }} />
                )}
            </View>
        </View>
    );
};

export default Header;

export const styles = StyleSheet.create({
    headerCenterContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      flex: 3
    },
    backButton: {
      paddingLeft: 10,
      marginRight: 'auto',
      width: '20%',
      flex: 1
    },
    rightButton: {
      paddingRight: 10,
      alignItems: 'flex-end',
      width: '20%'
    },
    buttonIcon: {
      color: 'white',
      fontSize: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      paddingTop: 50,
      padding: 15,
    },
    shortHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
        padding: 15,
      },
    headerText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
  })
