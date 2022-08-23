import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { Card } from "../api/get-decks";

interface CardsGameDifficultyButtonsProps {
  onDifficultyLevel: (level: Card["difficulty"]) => void;
  onFail: () => void;
}

export const CardsGameDifficultyButtons = ({
  onDifficultyLevel,
  onFail,
}: CardsGameDifficultyButtonsProps) => {
  return (
    <View style={styles.evaluateWrapper}>
      <Button color="violet" mode="contained" onPress={onFail}>
        Fail
      </Button>
      <Button color="green" mode="contained" onPress={() => onDifficultyLevel("easy")}>
        Easy
      </Button>
      <Button color="yellow" mode="contained" onPress={() => onDifficultyLevel("medium")}>
        Medium
      </Button>
      <Button color="red" mode="contained" onPress={() => onDifficultyLevel("hard")}>
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
