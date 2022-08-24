import { StyleSheet, View, Text } from "react-native";
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
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          backgroundColor: "#ffffff",
          borderRadius: 15,
          height: 75,
          ...styles.shadow,
        },
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

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
