import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CardsGameResult } from "../screens/CardsGameResult";
import { DeckScreen } from "../screens/DeckScreen";
import { DecksScreen } from "../screens/DecksScreen";
import { DecksStackParams } from "../types/stack.types";

const DecksStack = createNativeStackNavigator<DecksStackParams>();

export const DecksScreenStack = () => (
  <DecksStack.Navigator
    initialRouteName="Deck"
    screenOptions={{
      headerShown: false,
    }}
  >
    <DecksStack.Screen name="Decks" component={DecksScreen} />
    <DecksStack.Screen name="Deck" component={DeckScreen} />
    <DecksStack.Screen name="CardsGameResult" component={CardsGameResult} />
  </DecksStack.Navigator>
);
