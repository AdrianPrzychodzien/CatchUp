import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DecksStackParams } from "../../App";
import { DeckScreen } from "../screens/DeckScreen";
import { DecksScreen } from "../screens/DecksScreen";

const DecksStack = createNativeStackNavigator<DecksStackParams>();

export const DecksScreenStack = () => (
  <DecksStack.Navigator initialRouteName="Decks">
    <DecksStack.Screen name="Decks" component={DecksScreen} />
    <DecksStack.Screen name="Deck" component={DeckScreen} />
  </DecksStack.Navigator>
);
