import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { Card, Deck } from "../api/get-decks";
import { getCardInterval } from "../helpers/get-card-interval.helper";
import { RootStackParams } from "../types/stack.types";

type CardsGameProps = NativeStackNavigationProp<RootStackParams>;

export const CardsGame = ({ deck }: { deck: Deck }) => {
  const navigation = useNavigation<CardsGameProps>();
  const [started, setStarted] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [step, setStep] = useState(0);

  const [savedCards, setSavedCards] = useState<Card[]>([]);
  const [cardsToRemove, setCardsToRemove] = useState<Card[]>([]);

  const handleDifficultyLevel = (level: Card["difficulty"]) => {
    const currentCard = deck.cards[step];

    const interval = getCardInterval(level, currentCard);

    const cardToSave = {
      ...currentCard,
      interval,
      difficulty: level,
    };

    const cardToRemove =
      cardToSave.difficulty === "easy" && cardToSave.prev_difficulty === "easy" && level === "easy";

    if (cardToRemove) {
      setCardsToRemove(prev => [...prev, cardToSave]);
    } else {
      setSavedCards(prev => [...prev, cardToSave]);
    }

    setFlipped(false);
    setStep(prev => prev + 1);
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
    if (step === deck.cards.length) {
      navigation.navigate("CardsGameResult", { deckId: deck.id, savedCards, cardsToRemove });
    }
  }, [step]);

  return (
    <View style={styles.cardsGameWrapper}>
      {!started && (
        <Button mode="contained" onPress={() => setStarted(true)}>
          Start
        </Button>
      )}

      {started && step < deck.cards.length && (
        <View>
          <Text style={{ fontSize: 24, textAlign: "center" }}>{deck.cards[step].front}</Text>
          {flipped && (
            <>
              <hr style={styles.horizontalRule} />

              <Text style={{ fontSize: 24, textAlign: "center" }}>{deck.cards[step].back}</Text>
            </>
          )}
        </View>
      )}

      {started && !flipped && (
        <View style={styles.flipButtonWrapper}>
          <Button mode="contained" onPress={() => setFlipped(true)}>
            Flip
          </Button>
        </View>
      )}

      {started && flipped && (
        <View style={styles.evaluateWrapper}>
          <Button mode="contained" onPress={() => handleDifficultyLevel("easy")}>
            Easy
          </Button>
          <Button mode="contained" onPress={() => handleDifficultyLevel("medium")}>
            Medium
          </Button>
          <Button mode="contained" onPress={() => handleDifficultyLevel("hard")}>
            Hard
          </Button>
        </View>
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
  horizontalRule: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: "100%",
    marginBottom: "25%",
  },
  flipButtonWrapper: {
    position: "absolute",
    bottom: 0,
    marginBottom: "10%",
    width: "90%",
  },
  evaluateWrapper: {
    position: "absolute",
    bottom: 0,
    marginBottom: "10%",
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
