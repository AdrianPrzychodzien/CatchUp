import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { ListElementDeck } from "../api/get-decks";
import { RootStackParams } from "../types/stack.types";
import { differenceInHours, differenceInMinutes } from "date-fns";

type DecksScreenProps = NativeStackNavigationProp<RootStackParams>;

export const DeckPreview = ({ deck }: { deck: ListElementDeck }) => {
  console.log("🚀 ~ deck", deck);
  const navigation = useNavigation<DecksScreenProps>();

  const canPlay = deck.playable_cards_count > 0;

  const buildAvailableText = (time: string) => {
    const diffInHours = differenceInHours(new Date(time), new Date());
    if (diffInHours > 2) return `${diffInHours} hours`;

    const diffInMinutes = differenceInMinutes(new Date(time), new Date());
    return `${diffInMinutes} minutes`;
  };

  return (
    <Card style={styles.deck}>
      <View style={styles.deckTitle}>
        <Card.Title title={deck.name.substring(0, 18)} />
        <View style={dotStyles(canPlay).playableDot}></View>
      </View>

      <View style={styles.deckContent}>
        <Card.Content>
          <Text>
            cards: {deck.playable_cards_count} / {deck.all_cards_count}
          </Text>
          <Text>done: {deck.done_cards_count}</Text>
        </Card.Content>
        {canPlay ? (
          <Button
            contentStyle={{ flexDirection: "row-reverse" }}
            icon="arrow-right"
            onPress={() => navigation.navigate("Deck", { deckId: deck.id })}
          >
            start
          </Button>
        ) : (
          <Text>
            Available in
            <br />
            {deck.next_game_available_at && buildAvailableText(deck.next_game_available_at)}
          </Text>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  deck: {
    margin: 8,
    padding: 12,
    borderRadius: 8,
    width: "85%",
  },
  deckContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deckTitle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

const dotStyles = (canPlay: boolean) =>
  StyleSheet.create({
    playableDot: {
      marginRight: 10,
      borderRadius: 50,
      width: 16,
      height: 16,
      backgroundColor: canPlay ? "green" : "red",
    },
  });
