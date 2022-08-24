import React, { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { Deck, getDeck } from "../api/get-decks";
import { CardsGame } from "../components/CardsGame";
import { TopBackNavigation } from "../components/TopBackNavigation";
import { DeckScreenProps } from "../navigation/types";

export const DeckScreen = ({ route }: DeckScreenProps) => {
  const { deckId } = route.params;
  const [deck, setDeck] = useState<Deck>();
  const [error, setError] = useState<any>();

  useEffect(() => {
    getDeck(`${deckId}`)
      .then(res => {
        setDeck({ ...res.deck, cards: res.cards });
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  return (
    <ScrollView contentContainerStyle={{ width: "100%", height: "100%" }}>
      <TopBackNavigation />
      {!deck && <div>Loading...</div>}
      {error && <Text>{error}</Text>}

      {deck && !!deck.cards && <CardsGame deck={deck} />}
    </ScrollView>
  );
};
