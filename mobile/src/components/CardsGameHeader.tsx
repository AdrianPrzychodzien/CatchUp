import React from "react";
import { StyleSheet, View } from "react-native";
import { Title } from "react-native-paper";
import { Deck } from "../api/get-decks";
import ProgressBar from "react-native-animated-progress";

export const CardsGameHeader = ({ deck, step }: { deck: Deck; step: number }) => {
  const progress = (step / deck.cards.length) * 100;

  return (
    <>
      <Title style={{ textAlign: "center", marginBottom: 16 }}>{deck.name}</Title>

      <View style={styles.progressBarWrapper}>
        <ProgressBar height={5} progress={progress} backgroundColor="#4a0072" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  progressBarWrapper: {
    width: "100%",
  },
});
