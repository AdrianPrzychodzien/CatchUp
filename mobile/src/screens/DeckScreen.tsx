import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Deck, getDecks } from "../api/get-decks";

export const DeckScreen = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [error, setError] = useState<any>();

  useEffect(() => {
    getDecks()
      .then(res => setDecks(res.decks))
      .catch(error => {
        setError(error.message);
      });
  }, []);

  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
      <SafeAreaView>
        {error && <Text>{error}</Text>}

        {!error &&
          decks &&
          decks.map(deck => (
            <View key={deck.id}>
              <pre>{JSON.stringify(deck, null, 2)}</pre>
            </View>
          ))}

        {!decks && <div>Loading...</div>}
      </SafeAreaView>
    </ScrollView>
  );
};
