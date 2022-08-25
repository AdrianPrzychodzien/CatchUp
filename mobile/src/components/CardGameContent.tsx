import { Animated, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useFlipCardAnimation } from "../hooks/animations/use-flip-card-animation.hook";
import { Card } from "../types/deck.types";

interface CardGameContentProps {
  cards: Card[];
  step: number;
  flipped: boolean;
  onFlip: () => void;
}

export const CardGameContent = ({ cards, step, flipped, onFlip }: CardGameContentProps) => {
  const { triggerFlipAnimation, frontAnimatedStyle, backAnimatedStyle } = useFlipCardAnimation({
    step,
  });

  const handleFlip = () => {
    triggerFlipAnimation();
    onFlip();
  };

  const cardContent = () => (
    <View style={styles.container}>
      <View>
        <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
          <Text style={styles.cardGameText}>{cards[step].front}</Text>
        </Animated.View>
        <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
          {flipped && <Text style={styles.cardGameText}>{cards[step].back}</Text>}
        </Animated.View>
      </View>
    </View>
  );

  const flipButton = () => (
    <View style={styles.flipButtonWrapper}>
      <Button mode="contained" onPress={handleFlip}>
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  flipCard: {
    width: "70vw",
    height: "70vw",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    border: "1px solid",
    backfaceVisibility: "hidden",
    borderColor: "rgba(220, 220, 220, 0.5)",
    boxShadow: "rgb(0 0 0 / 30%) 0px 5px 30px",
  },
  flipCardBack: {
    position: "absolute",
    top: 0,
    boxShadow: "rgb(0 0 0 / 80%) 0px 5px 30px",
  },
  cardGameText: {
    fontSize: 24,
    textAlign: "center",
  },
  flipButtonWrapper: {
    position: "absolute",
    bottom: 0,
    marginBottom: "10%",
    width: "90%",
  },
});
