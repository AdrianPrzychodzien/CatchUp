import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { Deck } from "../api/get-decks";

export const CardsGameHeader = ({ deck }: { deck: Deck }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={{ fontSize: 30 }}>{deck.name}</Text>
      <Text style={{ fontSize: 20 }}>{deck.cards.length} cards</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
});
