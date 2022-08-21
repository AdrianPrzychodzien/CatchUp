import { Card } from "../api/get-decks";

export const getCardInterval = (level: Card["difficulty"], currentCard: Card) => {
  let interval = 0;
  switch (level) {
    case "easy":
      if (currentCard.difficulty === "easy") {
        interval = 8;
      } else if (currentCard.difficulty === "medium") {
        interval = 6;
      } else if (currentCard.difficulty === "hard") {
        interval = 4;
      }

      if (!currentCard.difficulty) {
        interval = 4;
      }

      break;
    case "medium":
      if (currentCard.difficulty === "easy") {
        interval = 1;
      } else if (currentCard.difficulty === "medium") {
        interval = 2;
      } else if (currentCard.difficulty === "hard") {
        interval = 3;
      }

      if (!currentCard.difficulty) {
        interval = 2;
      }

      break;
    case "hard":
      if (currentCard.difficulty === "easy") {
        interval = 1;
      } else if (currentCard.difficulty === "medium") {
        interval = 1;
      } else if (currentCard.difficulty === "hard") {
        interval = 1;
      }

      if (!currentCard.difficulty) {
        interval = 1;
      }

      break;
  }

  return interval;
};
