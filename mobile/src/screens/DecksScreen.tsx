import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button } from "react-native-paper";
import { Deck, getDecks } from "../api/get-decks";
import { useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../types/stack.types";

type DecksScreenProps = NativeStackNavigationProp<RootStackParams>;

export const DecksScreen = () => {
  const navigation = useNavigation<DecksScreenProps>();

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
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button onPress={() => navigation.navigate("Home")}>Go to Home</Button>

      {error && <Text>{error}</Text>}

      {!error &&
        decks &&
        decks.map(deck => (
          <View key={deck.id}>
            <Button onPress={() => navigation.navigate("Deck", { deckId: deck.id })}>
              go to {deck.name}
            </Button>
          </View>
        ))}

      {!decks && <div>Loading...</div>}
    </ScrollView>
  );
};
