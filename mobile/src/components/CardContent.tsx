import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { Card } from "../api/get-decks";

interface CardContenttProps {
  cards: Card[];
  step: number;
  started: boolean;
  flipped: boolean;
  onFlip: () => void;
}

export const CardContent = ({ cards, step, started, flipped, onFlip }: CardContenttProps) => {
  if (started && step < cards.length) {
    return (
      <View>
        <Text style={{ fontSize: 24, textAlign: "center" }}>{cards[step].front}</Text>
        {flipped && (
          <>
            <hr style={styles.horizontalRule} />

            <Text style={{ fontSize: 24, textAlign: "center" }}>{cards[step].back}</Text>
          </>
        )}
      </View>
    );
  }

  if (started && !flipped) {
    return (
      <View style={styles.flipButtonWrapper}>
        <Button mode="contained" onPress={onFlip}>
          Flip
        </Button>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  horizontalRule: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: "100%",
    marginBottom: "25%",
  },
  flipButtonWrapper: {
    position: "absolute",
    bottom: 0,
    marginBottom: "10%",
    width: "90%",
  },
});
