import React from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Animated from "react-native-reanimated";
import { differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";
import { Button, Card, Text, useTheme } from "react-native-paper";
import { RootStackProps } from "../navigation/types";
import { ListElementDeck } from "../types/deck.types";
import { useDeckListAnimation } from "../hooks/animations/use-deck-list-animation.hook";

export const DeckPreview = ({ deck }: { deck: ListElementDeck }) => {
  const navigation = useNavigation<RootStackProps>();
  const theme = useTheme();

  const canPlay = deck.playable_cards_count > 0;

  const buildAvailableText = (time: string) => {
    const diffInHours = differenceInHours(new Date(time), new Date());
    if (diffInHours > 2) return `${diffInHours} hours`;

    const diffInMinutes = differenceInMinutes(new Date(time), new Date());
    if (diffInMinutes > 2) return `${diffInMinutes} minutes`;

    const diffInSeconds = differenceInSeconds(new Date(time), new Date());
    if (diffInSeconds > 2) return `${diffInSeconds} seconds`;
  };

  const { reanimatedStyle } = useDeckListAnimation();

  return (
    <Animated.View style={[{ ...styles.deck, ...theme.styledBoxShadow }, reanimatedStyle]}>
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
          <>
            <Button
              contentStyle={{ flexDirection: "row-reverse" }}
              icon="arrow-right"
              onPress={() => navigation.navigate("Deck", { deckId: deck.id })}
            >
              start
            </Button>
            <Button
              contentStyle={{ flexDirection: "row-reverse" }}
              icon="arrow-right"
              onPress={() => navigation.navigate("Deck", { deckId: deck.id, withoutSave: true })}
            >
              train
            </Button>
          </>
        ) : (
          <Text>
            Available in
            <br />
            {deck.next_game_available_at && buildAvailableText(deck.next_game_available_at)}
          </Text>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  deck: {
    margin: 8,
    padding: 12,
    borderRadius: 20,
    width: "90%",
    height: 100,
    backgroundColor: "white",
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
