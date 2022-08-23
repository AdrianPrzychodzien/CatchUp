import React, { useCallback, useState } from "react";
import { ScrollView } from "react-native";
import { Text, Title } from "react-native-paper";
import { getDecks, ListElementDeck } from "../api/get-decks";
import { useFocusEffect } from "@react-navigation/native";
import { DeckPreview } from "../components/DeckPreview";

export const DecksScreen = () => {
  const [decks, setDecks] = useState<ListElementDeck[]>([]);
  console.log("🚀 ~ decks", decks);
  const [error, setError] = useState<any>();

  useFocusEffect(
    useCallback(() => {
      getDecks()
        .then(setDecks)
        .catch(error => {
          setError(error.message);
        });
    }, [])
  );

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {error && <Text>{error}</Text>}

      {!error && decks && (
        <>
          <Title>Your decks:</Title>
          {decks.map(deck => (
            <DeckPreview key={deck.id} deck={deck} />
          ))}
        </>
      )}

      {!decks && <div>Loading...</div>}
    </ScrollView>
  );
};
