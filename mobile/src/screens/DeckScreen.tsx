import React, { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { useTheme } from "react-native-paper";
import { getDeck } from "../api/get-decks";
import { CardsGame } from "../components/CardsGame";
import { TopBackNavigation } from "../components/TopBackNavigation";
import { DeckScreenProps } from "../navigation/types";
import { Deck } from "../types/deck.types";

export const DeckScreen = ({ route }: DeckScreenProps) => {
  const { deckId } = route.params;
  const theme = useTheme();
  const [deck, setDeck] = useState<Deck>();
  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getDeck(`${deckId}`)
      .then(res => {
        setDeck({ ...res.deck, cards: res.cards });
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.backgroundColor,
      }}
    >
      <TopBackNavigation absolute />

      {error && <Text>{error}</Text>}

      {deck && !!deck.cards && <CardsGame deck={deck} />}
    </ScrollView>
  );
};
