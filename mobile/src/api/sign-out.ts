import axios from "../utils/axios";

export const apiSignOut = (userId: string) => {
  return axios.delete(`/sessions/${userId}`);
};
