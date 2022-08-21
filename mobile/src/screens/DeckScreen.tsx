import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Deck, getDeck } from "../api/get-decks";
import { RootStackParams } from "../types/stack.types";

type DeckScreenProps = NativeStackNavigationProp<RootStackParams, "Deck">;

export const DeckScreen = ({ route }: DeckScreenProps) => {
  const deckId = route.params.deckId;
  const [deck, setDeck] = useState<Deck[]>([]);
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
    <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
      <SafeAreaView>
        {error && <Text>{error}</Text>}

        {!error && deck && <pre>{JSON.stringify(deck, null, 2)}</pre>}

        {!deck && <div>Loading...</div>}
      </SafeAreaView>
    </ScrollView>
  );
};
