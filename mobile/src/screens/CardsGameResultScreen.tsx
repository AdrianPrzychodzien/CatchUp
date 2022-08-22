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

export const CardsGameResultScreen = (props: DeckScreenProps) => {
  const { savedCards, deckId } = props.route.params;

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
