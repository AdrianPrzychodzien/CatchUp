import { View } from "react-native";
import { Text } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import { HomeScreen } from "../screens/HomeScreen";
import { RootStackParams } from "../navigation/types";
import { DecksScreenStack } from "./DecksScreenStack";
import { tabBarStyle } from "./styles";

const RootStack = createBottomTabNavigator<RootStackParams>();

export const AppScreenStack = () => {
  return (
    <RootStack.Navigator
      initialRouteName="DecksStack"
      screenOptions={({ route }) => ({
        tabBarStyle: tabBarStyle,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#e32f45",
        tabBarIcon: ({ focused }) => {
          let iconName;
          let rn = route.name;
          let label = "";

          if (rn === "Home") {
            iconName = "home";
            label = "home";
          } else if (rn === "DecksStack") {
            iconName = "list";
            label = "decks";
          }

          if (iconName) {
            return (
              <View style={{ alignItems: "center", justifyContent: "center", top: 0 }}>
                <Icon name={iconName} size={26} color={focused ? "#e32f45" : "#748c94"} />
                <Text
                  style={{ color: focused ? "#e32f45" : "#748c94", fontSize: 12, marginTop: 6 }}
                >
                  {label.toUpperCase()}
                </Text>
              </View>
            );
          }
        },
      })}
    >
      <RootStack.Screen name="Home" component={HomeScreen} />
      <RootStack.Screen name="DecksStack" component={DecksScreenStack} />
    </RootStack.Navigator>
  );
};
