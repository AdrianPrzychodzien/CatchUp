import type { NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { Card } from "../types/deck.types";

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

export type RootStackProps = NativeStackNavigationProp<RootStackParams>;

// Screen props

export type DeckScreenProps = NativeStackScreenProps<RootStackParams, "Deck">;

export type CardsGameResultProps = NativeStackScreenProps<RootStackParams, "CardsGameResult">;

export type HomeScreenProps = NativeStackScreenProps<RootStackParams, "Home">;
