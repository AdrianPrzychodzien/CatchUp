import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import ProgressBar from "react-native-animated-progress";
import { Deck } from "../types/deck.types";

interface CardsGameHeaderProps {
  deck: Deck;
  step: number;
}

export const CardsGameHeader = ({ deck, step }: CardsGameHeaderProps) => {
  const progress = (step / deck.cards.length) * 100;

  return (
    <>
      <Text variant="headlineMedium" style={styles.title}>
        {deck.name}
      </Text>

      <View style={styles.progressBarWrapper}>
        <ProgressBar height={5} progress={progress} backgroundColor="#4a0072" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    marginBottom: 16,
  },
  progressBarWrapper: {
    width: "100%",
  },
});
