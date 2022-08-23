import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { Card } from "../api/get-decks";

interface CardGameContentProps {
  cards: Card[];
  step: number;
  flipped: boolean;
  onFlip: () => void;
}

export const CardGameContent = ({ cards, step, flipped, onFlip }: CardGameContentProps) => {
  const cardContent = () => (
    <View style={{ width: "100%" }}>
      <Text style={styles.cardGameText}>{cards[step].front}</Text>
      {flipped && (
        <>
          <hr style={styles.horizontalRule} />

          <Text style={styles.cardGameText}>{cards[step].back}</Text>
        </>
      )}
    </View>
  );

  const flipButton = () => (
    <View style={styles.flipButtonWrapper}>
      <Button mode="contained" onPress={onFlip}>
        Flip
      </Button>
    </View>
  );

  return (
    <>
      {step < cards.length && cardContent()}
      {!flipped && flipButton()}
    </>
  );
};

const styles = StyleSheet.create({
  cardGameText: {
    fontSize: 24,
    textAlign: "center",
  },
  horizontalRule: {
    borderBottomColor: "lightGray",
    borderBottomWidth: 1,
    width: "90%",
    marginTop: 16,
    marginBottom: 16,
  },
  flipButtonWrapper: {
    position: "absolute",
    bottom: 0,
    marginBottom: "10%",
    width: "90%",
  },
});
