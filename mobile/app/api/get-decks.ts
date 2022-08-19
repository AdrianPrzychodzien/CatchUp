import axios from "./axios";

const API_URL = "http://localhost:3000/api/v1/";

export interface Deck {
  id: number;
  name: string;
  cards: any;
}

// interface NewPostPayload {
//   title: string;
//   body: string;
// }

export const getDecks = async () => {
  return await axios.get(`${API_URL}decks`).then((response) => {
      console.log("🚀 ~ response", response);
      return response.data;
  });
};

// export async function getDecks() {
//   const requestInfo = {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };
//   const response = await fetch(`${API_URL}decks`, requestInfo);
//   const posts = await response.json();
//   return posts;
// }

// export async function createPost(payload: NewPostPayload) {
//   const requestInfo = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(payload),
//   };
//   const response = await fetch(API_URL + "posts", requestInfo);
//   const post = await response.json();
//   return post;
// }
