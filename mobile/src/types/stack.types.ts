import { NavigatorScreenParams } from "@react-navigation/native";
import { Card } from "../api/get-decks";

export type RootStackParams = {
  Home: undefined;
  DecksStack: NavigatorScreenParams<DecksStackParams>;
  Deck: { deckId: number };
  CardsGameResult: { deckId: number; savedCards: Card[] };
};

export type DecksStackParams = {
  Decks: undefined;
  Deck: { deckId: number };
  CardsGameResult: { deckId: number; savedCards: Card[] };
};

export type AuthStackParams = {
  Login: undefined;
  Register: undefined;
};
