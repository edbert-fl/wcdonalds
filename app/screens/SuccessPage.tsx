import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { RootStackParamList } from '../utils/Types';
import { successStyles } from '../utils/Styles';
import { useCart } from '../components/CartContext';
import AddToCartAnimation from '../components/animations/AddToCartAnimation';

type SuccessPageRouteProp = RouteProp<RootStackParamList, "Success">;

interface AddToCartSuccessProps {
    route: SuccessPageRouteProp;
}

const SuccessPage: React.FC<AddToCartSuccessProps> = ({ route }) => {
    const { successText, includeConfetti, animation } = route.params;
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const confettiCannonRef = useRef<any>(null);
    const { setCartVisible } = useCart(); 

    if (confettiCannonRef.current) {
        confettiCannonRef.current.start();
    }

    console.log("AddToCartSuccess.tsx: successText >>>", successText)
    console.log("AddToCartSuccess.tsx: includeConfetti >>>", includeConfetti)

    return (
        <View style={successStyles.container}>
            {animation}
            <Text style={successStyles.text}>{successText}</Text>
            <TouchableOpacity style={successStyles.button} onPress={() => navigation.navigate("All Products")}>
                <Text style={successStyles.buttonText}>Back to Menu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={successStyles.secondaryButton} onPress={() => {navigation.navigate("All Products"); setCartVisible(true)}}>
                <Text style={successStyles.buttonText}>Open Cart</Text>
            </TouchableOpacity>
            {
                includeConfetti === true ? (
                    <ConfettiCannon
                ref={confettiCannonRef}
                count={50}
                explosionSpeed={30}
                origin={{x: -10, y: 0 }}
                fadeOut={true}
                autoStart={true}
            />
                ) : (
                    null
                )
            }
        </View>
    );
};

export default SuccessPage;
