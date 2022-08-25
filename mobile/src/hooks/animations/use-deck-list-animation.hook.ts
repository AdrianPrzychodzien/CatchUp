import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

export const useDeckListAnimation = () => {
  const progress = useSharedValue(0.5);
  const scale = useSharedValue(0);

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      transform: [{ scale: scale.value }],
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      progress.value = withTiming(1);
      scale.value = withTiming(1);

      return () => {
        progress.value = withTiming(0.5);
        scale.value = withTiming(0);
      };
    }, [])
  );

  return {
    reanimatedStyle,
  };
};
