import React, { useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Button, Title } from "react-native-paper";
import { saveGameResult } from "../api/save-game-result";
import { CardPreview } from "../components/CardPreview";
import { CardsGameResultProps } from "../navigation/types";

export const CardsGameResultScreen = ({ route, navigation }: CardsGameResultProps) => {
  const { savedCards, deckId } = route.params;

  useEffect(() => {
    saveGameResult({ deckId, savedCards })
      .then(res => {
        console.log("🚀 ~ res", res);
      })
      .catch(error => {
        console.log("🚀 ~ error", error);
      });
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Title>Preview:</Title>

      <View style={styles.cardsWrapper}>
        {savedCards.map(card => (
          <CardPreview key={card.id} card={card} />
        ))}
      </View>

      <Button onPress={() => navigation.navigate("DecksStack", { screen: "Decks" })}>
        Go to all decks
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardsWrapper: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    marginBottom: 20,
  },
});
