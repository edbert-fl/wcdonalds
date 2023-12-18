import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text, Platform } from 'react-native';
import LottieView from 'lottie-react-native';


const AddToCartAnimation = () => {
  const animationRef = useRef<LottieView | null>(null);

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.play();
    }
  }, []);

  return (
    Platform.OS === 'ios' ? (
      <LottieView
        ref={(animation) => (animationRef.current = animation)}
        source={require('../../../assets/add-to-cart.json')}
        style={{width:120, height: 100, marginBottom: 80}}
        loop={true}
      />
    ) : (
      null
    )
  );
};

export default AddToCartAnimation;