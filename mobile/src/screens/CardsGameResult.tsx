import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import { Deck, getDeck } from "../api/get-decks";
import { saveGameResult } from "../api/save-game-result";
import { CardsGame } from "../components/CardsGame";
import { CardsGameHeader } from "../components/CardsGameHeader";
import { TopBackNavigation } from "../components/TopBackNavigation";
import { DecksStackParams, RootStackParams } from "../types/stack.types";

type DeckScreenProps = NativeStackNavigationProp<DecksStackParams, "CardsGameResult"> & any;

export const CardsGameResult = (props: DeckScreenProps) => {
  const savedCards = props.route.params.savedCards;
  const cardsToRemove = props.route.params.cardsToRemove;
  const deckId = props.route.params.deckId;

  useEffect(() => {
    saveGameResult({ deckId, savedCards, cardsToRemove })
      .then(res => {
        console.log("🚀 ~ res", res);
      })
      .catch(error => {
        console.log("🚀 ~ error", error);
        // setError(error.message);
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
      </ScrollView>
    </>
  );
};
