import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { RootStackParams } from "../types/stack.types";

const RootStack = createBottomTabNavigator<RootStackParams>();

export const AuthScreenStack = () => {
  const token = new URLSearchParams(window.location.search).get("token") || "";

  return (
    <RootStack.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "tomato",
        tabBarIcon: ({ focused }) => {
          let iconName;
          let rn = route.name;

          if (rn === "Login") {
            iconName = "sign-in";
          } else if (rn === "Register") {
            iconName = "user-plus";
          }

          if (iconName) {
            return <Icon name={iconName} size={26} color={focused ? "tomato" : "gray"} />;
          }
        },
      })}
    >
      {token ? (
        <RootStack.Screen name="Register" component={RegisterScreen} />
      ) : (
        <RootStack.Screen name="Login" component={LoginScreen} />
      )}
    </RootStack.Navigator>
  );
};
