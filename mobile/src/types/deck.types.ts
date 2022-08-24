export interface Deck {
  id: number;
  name: string;
  cards: Card[];
}

export interface ListElementDeck {
  id: number;
  name: string;
  all_cards_count: number;
  playable_cards_count: number;
  done_cards_count: number;
  next_game_available_at: string | null;
}

export interface Card {
  id: string;
  front: string;
  back: string;
  interval: number;
  difficulty: CARD_DIFFICULTY;
  prev_difficulty: CARD_DIFFICULTY;
}

export enum CARD_DIFFICULTY {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}
