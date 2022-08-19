import axios from "./axios";

export const apiSignIn = (params: { [x: string]: any }) => {
  return axios.post(`/sessions`, { student: params });
};
