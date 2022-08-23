import axios from "./axios";

export const saveGameResult = (params: { [x: string]: any }) => {
  return axios.post(`/decks/save_game`, params);
};
