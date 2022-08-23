import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { Card, Deck } from "../api/get-decks";
import { getCardInterval } from "../helpers/get-card-interval.helper";
import { RootStackParams } from "../types/stack.types";
import { CardsGameDifficultyButtons } from "./CardsGameDifficultyButtons";
import { CardContent } from "./CardContent";

type CardsGameProps = NativeStackNavigationProp<RootStackParams>;

export const CardsGame = ({ deck }: { deck: Deck }) => {
  const navigation = useNavigation<CardsGameProps>();
  const [started, setStarted] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [step, setStep] = useState(0);

  const [savedCards, setSavedCards] = useState<Card[]>([]);
  const [failedCards, setFailedCards] = useState<Card[]>([]);

  const allCards = [...deck.cards, ...failedCards];

  const haveCards = allCards.length > 0;

  const handleNext = () => {
    setFlipped(false);
    setStep(prev => prev + 1);
  };

  const handleDifficultyLevel = (level: Card["difficulty"]) => {
    const currentCard = allCards[step];

    const interval = getCardInterval(level, currentCard);

    const cardToSave = {
      ...currentCard,
      interval,
      difficulty: level,
    };

    setSavedCards(prev => [...prev, cardToSave]);
    handleNext();
  };

  const handleFail = (card: Card) => {
    setFailedCards(prev => [...prev, card]);
    handleNext();
  };

  useEffect(() => {
    if (started) {
      navigation.getParent()?.setOptions({
        tabBarStyle: { display: "none" },
      });

      return () => navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    }
  }, [started]);

  useEffect(() => {
    if (haveCards && step === allCards.length) {
      navigation.navigate("CardsGameResult", { deckId: deck.id, savedCards });
    }
  }, [step]);

  if (!haveCards) {
    return (
      <View style={styles.cardsGameWrapper}>
        <Text>There are no cards in this deck</Text>
      </View>
    );
  }

  return (
    <View style={styles.cardsGameWrapper}>
      {!started && (
        <Button mode="contained" onPress={() => setStarted(true)}>
          Start
        </Button>
      )}

      <CardContent
        cards={allCards}
        step={step}
        started={started}
        flipped={flipped}
        onFlip={() => setFlipped(true)}
      />

      {started && flipped && (
        <CardsGameDifficultyButtons
          onDifficultyLevel={handleDifficultyLevel}
          onFail={() => handleFail(allCards[step])}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardsGameWrapper: {
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "25%",
  },
});
