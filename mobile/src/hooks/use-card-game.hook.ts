import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getCardInterval } from "../helpers/get-card-interval.helper";
import { RootStackParams, RootStackProps } from "../navigation/types";
import { Card, Deck } from "../types/deck.types";
import { useHideTabBar } from "./use-hide-tab-bar.hook";

export const useCardGame = ({ deck }: { deck: Deck }) => {
  const navigation = useNavigation<RootStackProps>();

  const [flipped, setFlipped] = useState(false);
  const [step, setStep] = useState(0);
  const [savedCards, setSavedCards] = useState<Card[]>([]);
  const [failedCards, setFailedCards] = useState<Card[]>([]);

  const allCards = [...deck.cards, ...failedCards];
  const haveCards = allCards.length > 0;

  useEffect(() => {
    if (haveCards && step === allCards.length) {
      navigation.navigate("CardsGameResult", { deckId: deck.id, savedCards });
    }
  }, [step]);

  useHideTabBar<RootStackParams>({ navigation });

  const handleNext = () => {
    setFlipped(false);
    setStep(prev => prev + 1);
  };

  const handleDifficultyLevel = (level: Card["difficulty"]) => {
    const currentCard = allCards[step];

    const interval = getCardInterval(level, currentCard);

    const cardToSave = {
      ...currentCard,
      interval,
      difficulty: level,
    };

    setSavedCards(prev => [...prev, cardToSave]);
    handleNext();
  };

  const handleFail = (card: Card) => {
    setFailedCards(prev => [...prev, card]);
    handleNext();
  };

  const handleFlip = () => setFlipped(true);

  return {
    step,
    flipped,
    allCards,
    handleDifficultyLevel,
    handleFail,
    handleFlip,
  };
};
