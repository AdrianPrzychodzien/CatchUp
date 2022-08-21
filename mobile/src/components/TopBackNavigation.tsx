import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export const TopBackNavigation = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Icon name="arrow-left" onPress={() => navigation.goBack()} style={styles.backButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 20,
  },
  backButton: {
    borderRadius: 8,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
