import axios from "./axios";

export interface Deck {
  id: number;
  name: string;
  cards: any;
}

export const getDecks = async () => {
  return await axios.get(`/decks`).then(response => {
    return response.data;
  });
};
