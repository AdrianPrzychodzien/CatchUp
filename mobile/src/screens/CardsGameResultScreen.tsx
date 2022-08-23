import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { Button } from "react-native-paper";
import { Card, Deck, getDeck } from "../api/get-decks";
import { saveGameResult } from "../api/save-game-result";
import { CardPreview } from "../components/CardPreview";
import { TopBackNavigation } from "../components/TopBackNavigation";
import { DecksStackParams, RootStackParams } from "../types/stack.types";

type DeckScreenProps = NativeStackNavigationProp<DecksStackParams, "CardsGameResult"> & any;
type CardsGameResultScreenProps = NativeStackNavigationProp<RootStackParams>;

export const CardsGameResultScreen = (props: DeckScreenProps) => {
  const { savedCards, deckId } = props.route.params;
  const navigation = useNavigation<CardsGameResultScreenProps>();

  console.log("🚀 ~ savedCards", savedCards);

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
    <ScrollView
      contentContainerStyle={{
        width: "100%",
        height: "100%",
      }}
    >
      <TopBackNavigation />
      <Text>Preview:</Text>

      <View style={styles.cardsWrapper}>
        {savedCards.map((card: Card) => {
          return <CardPreview key={card.id} card={card} />;
        })}
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
    marginBottom: 20,
  },
});
