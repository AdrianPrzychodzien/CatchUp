import React, { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { useTheme } from "react-native-paper";
import { getDeck } from "../api/get-decks";
import { CardsGame } from "../components/CardsGame";
import { TopBackNavigation } from "../components/TopBackNavigation";
import { CardGameContextProvider } from "../context/card-game/cardGame.context";
import { DeckScreenProps } from "../navigation/types";
import { Deck } from "../types/deck.types";

export const DeckScreen = ({ route }: DeckScreenProps) => {
  const { deckId, withoutSave } = route.params;
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

      {deck && !!deck.cards && (
        <CardGameContextProvider withoutSave={withoutSave}>
          <CardsGame deck={deck} />
        </CardGameContextProvider>
      )}
    </ScrollView>
  );
};
