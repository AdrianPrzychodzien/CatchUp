import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { useCardGameContext } from "../context/card-game/cardGame.context";
import { CARD_DIFFICULTY } from "../types/deck.types";

interface CardsGameDifficultyButtonsProps {
  onDifficultyLevel: (level: CARD_DIFFICULTY) => void;
  onFail: () => void;
  onNext: () => void;
}

export const CardsGameDifficultyButtons = ({
  onDifficultyLevel,
  onFail,
  onNext,
}: CardsGameDifficultyButtonsProps) => {
  const { withoutSave } = useCardGameContext();

  if (withoutSave) {
    return (
      <View style={styles.evaluateWrapper}>
        <Button buttonColor="violet" mode="contained-tonal" onPress={onFail}>
          Fail
        </Button>
        <Button mode="contained" onPress={onNext}>
          Next
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.evaluateWrapper}>
      <Button buttonColor="violet" mode="contained-tonal" onPress={onFail}>
        Fail
      </Button>
      <Button
        buttonColor="green"
        mode="contained-tonal"
        onPress={() => onDifficultyLevel(CARD_DIFFICULTY.EASY)}
      >
        Easy
      </Button>
      <Button
        buttonColor="yellow"
        mode="contained-tonal"
        onPress={() => onDifficultyLevel(CARD_DIFFICULTY.MEDIUM)}
      >
        Medium
      </Button>
      <Button
        buttonColor="red"
        mode="contained-tonal"
        onPress={() => onDifficultyLevel(CARD_DIFFICULTY.HARD)}
      >
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
