import { useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../types/stack.types";

export const useHideTabBar = <T extends RootStackParams>({
  navigation,
}: {
  navigation: NativeStackNavigationProp<T>;
}) => {
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: "none" },
    });

    return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
  }, []);
};
