import { Card, CARD_DIFFICULTY } from "../types/deck.types";

export const getCardInterval = (level: CARD_DIFFICULTY, currentCard: Card) => {
  let interval = 0;
  switch (level) {
    case CARD_DIFFICULTY.EASY:
      if (currentCard.difficulty === CARD_DIFFICULTY.EASY) {
        interval = 8;
      } else if (currentCard.difficulty === CARD_DIFFICULTY.MEDIUM) {
        interval = 6;
      } else if (currentCard.difficulty === CARD_DIFFICULTY.HARD) {
        interval = 4;
      }

      if (!currentCard.difficulty) {
        interval = 4;
      }

      break;
    case CARD_DIFFICULTY.MEDIUM:
      if (currentCard.difficulty === CARD_DIFFICULTY.EASY) {
        interval = 1;
      } else if (currentCard.difficulty === CARD_DIFFICULTY.MEDIUM) {
        interval = 2;
      } else if (currentCard.difficulty === CARD_DIFFICULTY.HARD) {
        interval = 3;
      }

      if (!currentCard.difficulty) {
        interval = 2;
      }

      break;
    case CARD_DIFFICULTY.HARD:
      if (currentCard.difficulty === CARD_DIFFICULTY.EASY) {
        interval = 1;
      } else if (currentCard.difficulty === CARD_DIFFICULTY.MEDIUM) {
        interval = 1;
      } else if (currentCard.difficulty === CARD_DIFFICULTY.HARD) {
        interval = 1;
      }

      if (!currentCard.difficulty) {
        interval = 1;
      }

      break;
  }

  return interval;
};
