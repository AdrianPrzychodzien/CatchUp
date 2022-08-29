import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { CardsGameDifficultyButtons } from "./CardsGameDifficultyButtons";
import { CardGameContent } from "./CardGameContent";
import { CardsGameHeader } from "./CardsGameHeader";
import { useCardGame } from "../hooks/use-card-game.hook";
import { Deck } from "../types/deck.types";
import { useCardGameContext } from "../context/card-game/cardGame.context";

interface CardsGameProps {
  deck: Deck;
}

export const CardsGame = ({ deck }: CardsGameProps) => {
  const { withoutSave } = useCardGameContext();
  const { step, flipped, allCards, handleDifficultyLevel, handleFail, handleFlip, handleNext } =
    useCardGame({ deck });

  const haveCards = allCards.length > 0;

  if (!haveCards) {
    return (
      <View style={styles.cardsGameWrapper}>
        <Text>There are no cards in this deck</Text>
      </View>
    );
  }

  return (
    <View style={styles.cardsGameWrapper}>
      <View style={styles.headerWrapper}>
        <CardsGameHeader deck={deck} step={flipped ? step + 1 : step} />
      </View>

      <CardGameContent cards={allCards} step={step} flipped={flipped} onFlip={handleFlip} />

      {flipped && (
        <CardsGameDifficultyButtons
          onDifficultyLevel={handleDifficultyLevel}
          onFail={() => handleFail(allCards[step])}
          onNext={handleNext}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    position: "absolute",
    top: 16,
    left: 0,
    right: 0,
  },
  cardsGameWrapper: {
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "25%",
  },
});
