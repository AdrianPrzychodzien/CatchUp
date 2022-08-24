import axios from "../utils/axios";

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
