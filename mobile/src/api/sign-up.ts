import axios from "./axios";

export const apiSignUp = (params: { [x: string]: any }) => {
  return axios.post(`/registrations`, { student: params });
};
