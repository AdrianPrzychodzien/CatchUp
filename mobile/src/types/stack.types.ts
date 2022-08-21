import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParams = {
  Home: undefined;
  DecksStack: NavigatorScreenParams<DecksStackParams>;
  Deck: { deckId: number };
};

export type DecksStackParams = {
  Decks: undefined;
  Deck: { deckId: number };
};

export type AuthStackParams = {
  Login: undefined;
  Register: undefined;
};
