import axios from "./axios";

const API_URL = "http://localhost:3000/api/v1/";

export interface Deck {
  id: number;
  name: string;
  cards: any;
}

export const getDecks = async () => {
  return await axios.get(`${API_URL}decks`).then(response => {
    return response.data;
  });
};
