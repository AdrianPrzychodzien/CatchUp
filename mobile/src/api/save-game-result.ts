import axios from "./axios";

export const saveGameResult = (params: { [x: string]: any }) => {
  console.log("🚀 ~ params", params);
  return axios.post(`/decks/save_game`, params);
};
