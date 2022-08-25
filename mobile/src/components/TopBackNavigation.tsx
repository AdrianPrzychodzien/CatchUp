import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface TopBackNavigationProps {
  absolute?: true;
}

export const TopBackNavigation = ({ absolute }: TopBackNavigationProps) => {
  const navigation = useNavigation();

  const content = (
    <View style={styles.container}>
      <Icon name="arrow-left" onPress={() => navigation.goBack()} style={styles.backButton} />
    </View>
  );

  if (absolute) {
    return <View style={styles.absoluteWrapper}>{content}</View>;
  }

  return content;
};

const styles = StyleSheet.create({
  absoluteWrapper: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
  },
  container: {
    flexDirection: "row",
  },
  backButton: {
    borderRadius: 8,
    width: 50,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 16,
  },
});
