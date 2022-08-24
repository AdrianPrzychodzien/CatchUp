import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import { HomeScreen } from "../screens/HomeScreen";
import { RootStackParams } from "../navigation/types";
import { DecksScreenStack } from "./DecksScreenStack";

const RootStack = createBottomTabNavigator<RootStackParams>();

export const AppScreenStack = () => {
  return (
    <RootStack.Navigator
      initialRouteName="DecksStack"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "tomato",
        tabBarIcon: ({ focused }) => {
          let iconName;
          let rn = route.name;

          if (rn === "Home") {
            iconName = "home";
          } else if (rn === "DecksStack") {
            iconName = "list";
          }

          if (iconName) {
            return <Icon name={iconName} size={26} color={focused ? "tomato" : "gray"} />;
          }
        },
      })}
    >
      <RootStack.Screen name="Home" component={HomeScreen} />
      <RootStack.Screen name="DecksStack" component={DecksScreenStack} />
    </RootStack.Navigator>
  );
};
