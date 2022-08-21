import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParams = {
  Home: undefined;
  DecksStack: NavigatorScreenParams<DecksStackParams>;
  Login: undefined;
  Register: undefined;
  Deck: { deckId: number };
};

export type DecksStackParams = {
  Decks: undefined;
  Deck: { deckId: number };
};
