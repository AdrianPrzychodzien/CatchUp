import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, Text } from "react-native";
import { getDeck } from "../api/get-decks";
import { CardsGame } from "../components/CardsGame";
import { TopBackNavigation } from "../components/TopBackNavigation";
import { CardGameContextProvider } from "../context/card-game/cardGame.context";
import { useStyles } from "../hooks/use-styles.hook";
import { DeckScreenProps } from "../navigation/types";
import { Deck } from "../types/deck.types";
import { AppTheme } from "../types/theme.types";

export const DeckScreen = ({ route }: DeckScreenProps) => {
  const { deckId, withoutSave } = route.params;
  const [deck, setDeck] = useState<Deck>();
  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const tStyle = useStyles(styles);

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
    <ScrollView contentContainerStyle={tStyle.contentContainer}>
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

const styles = (theme: AppTheme) =>
  StyleSheet.create({
    contentContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.backgroundColor,
    },
  });
