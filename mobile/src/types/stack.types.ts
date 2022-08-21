import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParams = {
  Home: undefined;
  DecksStack: NavigatorScreenParams<DecksStackParams>;
  Deck: { deckId: number };
  CardsGameResult: { deckId: number; savedCards: any[]; cardsToRemove: any[] };
};

export type DecksStackParams = {
  Decks: undefined;
  Deck: { deckId: number };
  CardsGameResult: { deckId: number; savedCards: any[]; cardsToRemove: any[] };
};

export type AuthStackParams = {
  Login: undefined;
  Register: undefined;
};
