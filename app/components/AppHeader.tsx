import { View, Text, TouchableOpacity, GestureResponderEvent } from 'react-native'
import React, { ReactNode } from 'react'
import { headerStyles } from '../utils/Styles'
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
    title: string;
    onBackPress?: () => void;
    onBackIcon?: string | ReactNode;
    onRightPress?: () => void;
    onRightIcon?: string | ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, onBackPress, onRightPress, onBackIcon, onRightIcon }) => {
    const navigation = useNavigation();

    return (
        <View>
            <View style={headerStyles.header}>
                {onBackPress ? (
                    <TouchableOpacity
                        style={headerStyles.backButton}
                        onPress={onBackPress}
                        hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                        {typeof onBackIcon === 'string' || null ? (
                            <Text style={headerStyles.buttonIcon}>{onBackIcon || 'Back'}</Text>
                        ) : (
                            onBackIcon
                        )}
                    </TouchableOpacity>
                ) : (
                    <View style={{ flex: 1, width: '20%' }} />
                )}
                <View style={headerStyles.headerCenterContainer}>
                    <Text style={headerStyles.headerText}>{title}</Text>
                </View>
                {onRightPress ? (
                    <TouchableOpacity
                        style={headerStyles.rightButton}
                        onPress={onRightPress}
                        hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                        {typeof onRightIcon === 'string' || null ? (
                            <Text style={headerStyles.buttonIcon}>{onRightIcon || 'Next'}</Text>
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
