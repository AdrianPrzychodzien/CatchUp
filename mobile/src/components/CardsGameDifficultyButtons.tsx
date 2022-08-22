import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { Card } from "../api/get-decks";

interface CardsGameDifficultyButtonsProps {
  onDifficultyLevel: (level: Card["difficulty"]) => void;
}

export const CardsGameDifficultyButtons = ({
  onDifficultyLevel,
}: CardsGameDifficultyButtonsProps) => {
  return (
    <View style={styles.evaluateWrapper}>
      <Button mode="contained" onPress={() => onDifficultyLevel("easy")}>
        Easy
      </Button>
      <Button mode="contained" onPress={() => onDifficultyLevel("medium")}>
        Medium
      </Button>
      <Button mode="contained" onPress={() => onDifficultyLevel("hard")}>
        Hard
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  evaluateWrapper: {
    position: "absolute",
    bottom: 0,
    marginBottom: "10%",
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
