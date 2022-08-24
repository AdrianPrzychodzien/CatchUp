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
      <Button buttonColor="violet" mode="contained-tonal" onPress={onFail}>
        Fail
      </Button>
      <Button buttonColor="green" mode="contained-tonal" onPress={() => onDifficultyLevel("easy")}>
        Easy
      </Button>
      <Button
        buttonColor="yellow"
        mode="contained-tonal"
        onPress={() => onDifficultyLevel("medium")}
      >
        Medium
      </Button>
      <Button buttonColor="red" mode="contained-tonal" onPress={() => onDifficultyLevel("hard")}>
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
