import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import LottieView from 'lottie-react-native';


const ConfirmAnimation = () => {
  const animationRef = useRef<LottieView | null>(null);

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.play();
      console.log("ConfirmAnimation.tsx: Playing animation");
    }
  }, []);

  return (
    <View>
      <LottieView
        ref={(animation) => (animationRef.current = animation)}
        source={require('../../../assets/confirm.json')}
        style={{width:120, height: 100, marginBottom: 80}}
        loop={true}
      />
    </View>
  );
};

export default ConfirmAnimation;