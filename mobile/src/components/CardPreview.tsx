import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { Card as ICard } from "../api/get-decks";

export const CardPreview = ({ card }: { card: ICard }) => {
  const difficulty = card.difficulty;

  const color = difficulty === "easy" ? "green" : difficulty === "medium" ? "yellow" : "red";

  const stylesheet = styles(color);

  return (
    <Card style={stylesheet.card}>
      <Text style={stylesheet.topBar}>{difficulty.toUpperCase()}</Text>
      <View style={stylesheet.cardContent}>
        <Card.Title
          titleNumberOfLines={2}
          titleStyle={
            card.front.split(" ").length === 1 ? stylesheet.cardTextNoWrap : stylesheet.cardText
          }
          title={card.front}
        />
        <hr style={stylesheet.horizontalRule} />
        <Card.Title
          titleNumberOfLines={2}
          titleStyle={
            card.back.split(" ").length === 1 ? stylesheet.cardTextNoWrap : stylesheet.cardText
          }
          title={card.back}
        />
      </View>
    </Card>
  );
};

const styles = (color: string) =>
  StyleSheet.create({
    card: {
      margin: 6,
      border: `2px solid ${color}`,
      borderRadius: 12,
      maxWidth: "40%",
      minWidth: "40%",
    },
    cardContent: {
      padding: 6,
    },
    cardText: {
      textAlign: "center",
      fontSize: 18,
    },
    cardTextNoWrap: {
      textAlign: "center",
      fontSize: 18,
      whiteSpace: "nowrap",
    },
    topBar: {
      backgroundColor: color,
      textAlign: "center",
      padding: 4,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      fontSize: 16,
    },
    horizontalRule: {
      borderBottomColor: "black",
      borderBottomWidth: 1,
      width: "100%",
    },
  });
