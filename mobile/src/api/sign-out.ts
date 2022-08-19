import axios from "./axios";

export const apiSignOut = (userId: string) => {
  return axios.delete(`/sessions/${userId}`);
};
