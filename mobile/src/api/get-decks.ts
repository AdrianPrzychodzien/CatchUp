import axios from "./axios";

export interface ListElementDeck {
  id: number;
  name: string;
  all_cards_count: number;
  playable_cards_count: number;
  done_cards_count: number;
  next_game_available_at: string | null;
}

export interface Deck {
  id: number;
  name: string;
  cards: Card[];
}

export interface Card {
  id: string;
  front: string;
  back: string;
  interval: number;
  difficulty: "easy" | "medium" | "hard";
  prev_difficulty: "easy" | "medium" | "hard";
}

export const getDecks = async () => {
  return await axios.get(`/decks`).then(response => {
    return response.data;
  });
};

export const getDeck = async (id: string) => {
  return await axios.get(`/decks/${id}`).then(response => {
    return response.data;
  });
};
