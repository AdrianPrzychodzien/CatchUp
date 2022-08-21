import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DeckScreen } from "../screens/DeckScreen";
import { DecksScreen } from "../screens/DecksScreen";
import { DecksStackParams } from "../types/stack.types";

const DecksStack = createNativeStackNavigator<DecksStackParams>();

export const DecksScreenStack = () => (
  <DecksStack.Navigator
    initialRouteName="Decks"
    screenOptions={{
      headerShown: false,
    }}
  >
    <DecksStack.Screen name="Decks" component={DecksScreen} />
    <DecksStack.Screen name="Deck" component={DeckScreen} />
  </DecksStack.Navigator>
);
