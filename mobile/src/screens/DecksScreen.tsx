import React, { useCallback, useState } from "react";
import { ScrollView } from "react-native";
import { Text, Title, useTheme } from "react-native-paper";
import { getDecks } from "../api/get-decks";
import { useFocusEffect } from "@react-navigation/native";
import { DeckPreview } from "../components/DeckPreview";
import { ListElementDeck } from "../types/deck.types";

export const DecksScreen = () => {
  const theme = useTheme();
  const [decks, setDecks] = useState<ListElementDeck[]>([]);
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
        backgroundColor: theme.backgroundColor,
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
