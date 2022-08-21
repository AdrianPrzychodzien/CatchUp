import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { Deck, getDeck } from "../api/get-decks";
import { CardsGame } from "../components/CardsGame";
import { CardsGameHeader } from "../components/CardsGameHeader";
import { TopBackNavigation } from "../components/TopBackNavigation";
import { RootStackParams } from "../types/stack.types";

type DeckScreenProps = NativeStackNavigationProp<RootStackParams, "Deck"> & any;

export const DeckScreen = ({ route }: DeckScreenProps) => {
  // const deckId = route.params.deckId;
  const deckId = new URLSearchParams(window.location.search).get("deckId") || "43";
  const [deck, setDeck] = useState<Deck>();
  console.log("🚀 ~ deck", deck);
  const [error, setError] = useState<any>();

  useEffect(() => {
    getDeck(deckId)
      .then(res => setDeck(res.deck))
      .catch(error => {
        setError(error.message);
      });
  }, []);

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          width: "100%",
          height: "100%",
        }}
      >
        <TopBackNavigation />
        {deck && <CardsGameHeader deck={deck} />}
        {!deck && <div>Loading...</div>}
        {error && <Text>{error}</Text>}

        {/* <pre>{JSON.stringify(deck, null, 2)}</pre> */}
        {deck && <CardsGame deck={deck} />}
      </ScrollView>
    </>
  );
};
