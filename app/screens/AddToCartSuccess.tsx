import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { RootStackParamList } from '../utils/Types';
import { successStyles } from '../utils/Styles';
import { useCart } from '../components/CartContext';
import AddToCartAnimation from '../components/AddToCartAnimation';

interface AddToCartSuccessProps {
    successText: string;
}

/**
 *   If successText is none then the default is "Product added to cart!" and it will display the animation. Else not.
 */
const AddToCartSuccess: React.FC<AddToCartSuccessProps> = ({ successText }) => {

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const confettiCannonRef = useRef<any>(null);
    const { setCartVisible } = useCart(); 

    if (confettiCannonRef.current) {
        confettiCannonRef.current.start();
    }

    console.log("AddToCartSuccess.tsx: successText >>>", successText)

    return (
        <View style={successStyles.container}>
            { successText === undefined ? (
                <View style={{alignItems: 'center'}}>
                    <AddToCartAnimation/>
                    <Text style={successStyles.text}>Product added to cart!</Text>
                </View>
            ) : (
                <Text style={successStyles.text}>{successText}</Text>
            )}
            <TouchableOpacity style={successStyles.button} onPress={() => navigation.navigate("All Products")}>
                <Text style={successStyles.buttonText}>Back to Menu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={successStyles.secondaryButton} onPress={() => {navigation.navigate("All Products"); setCartVisible(true)}}>
                <Text style={successStyles.buttonText}>Open Cart</Text>
            </TouchableOpacity>

            <ConfettiCannon
                ref={confettiCannonRef}
                count={50}
                explosionSpeed={30}
                origin={{x: -10, y: 0 }}
                fadeOut={true}
                autoStart={true}
            />
        </View>
    );
};

export default AddToCartSuccess;
