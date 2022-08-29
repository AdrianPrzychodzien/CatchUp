import React, { useCallback, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { getDecks } from "../api/get-decks";
import { useFocusEffect } from "@react-navigation/native";
import { DeckPreview } from "../components/DeckPreview";
import { ListElementDeck } from "../types/deck.types";
import { AppTheme } from "../types/theme.types";
import { useStyles } from "../hooks/use-styles.hook";

export const DecksScreen = () => {
  const [decks, setDecks] = useState<ListElementDeck[]>([]);
  const [error, setError] = useState<any>();
  const tStyle = useStyles(styles);

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
    <ScrollView contentContainerStyle={tStyle.contentContainer}>
      {error && <Text>{error}</Text>}

      {!error && decks && (
        <>
          <Text variant="headlineMedium" style={{ position: "absolute", top: 30 }}>
            Your decks:
          </Text>
          {decks.map(deck => (
            <DeckPreview key={deck.id} deck={deck} />
          ))}
        </>
      )}

      {!decks && <div>Loading...</div>}
    </ScrollView>
  );
};

const styles = (theme: AppTheme) =>
  StyleSheet.create({
    contentContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.backgroundColor,
    },
  });
