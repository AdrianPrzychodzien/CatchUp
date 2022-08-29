import React, { useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Button, Title, useTheme } from "react-native-paper";
import { saveGameResult } from "../api/save-game-result";
import { CardPreview } from "../components/CardPreview";
import { useStyles } from "../hooks/use-styles.hook";
import { CardsGameResultProps } from "../navigation/types";
import { AppTheme } from "../types/theme.types";

export const CardsGameResultScreen = ({ route, navigation }: CardsGameResultProps) => {
  const { deckId, savedCards, withoutSave } = route.params;
  const tStyle = useStyles(styles);

  useEffect(() => {
    if (withoutSave) return;

    saveGameResult({ deckId, savedCards })
      .then(res => {
        console.log("🚀 ~ res", res);
      })
      .catch(error => {
        console.log("🚀 ~ error", error);
      });
  }, []);

  const buildContent = () => {
    if (withoutSave) {
      return (
        <Title style={{ textAlign: "center" }}>
          You have finished training mode. Your answers won`t be saved
        </Title>
      );
    } else {
      return (
        <>
          <Title>Preview:</Title>

          <View style={tStyle.cardsWrapper}>
            {savedCards.map(card => (
              <CardPreview key={card.id} card={card} />
            ))}
          </View>
        </>
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={tStyle.contentContainer}>
      {buildContent()}

      <Button onPress={() => navigation.navigate("DecksStack", { screen: "Decks" })}>
        Go to all decks
      </Button>
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
    cardsWrapper: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "row",
      flexWrap: "wrap",
      width: "100%",
      marginBottom: 20,
    },
  });
