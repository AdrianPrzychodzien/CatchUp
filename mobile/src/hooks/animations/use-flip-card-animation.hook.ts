import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export const useFlipCardAnimation = ({ step }: { step: number }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });
  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const animation = ({ toValue }: { toValue: number }) => {
    return Animated.spring(animatedValue, {
      toValue,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animation({ toValue: 0 });
  }, [step]);

  const frontAnimatedStyle = {
    transform: [{ rotateX: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateX: backInterpolate }],
  };

  const triggerFlipAnimation = () => {
    animation({ toValue: 180 });
  };

  return {
    frontAnimatedStyle,
    backAnimatedStyle,
    triggerFlipAnimation,
  };
};
