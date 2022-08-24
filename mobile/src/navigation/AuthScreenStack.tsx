import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { AuthStackParams } from "../navigation/types";

const AuthStack = createBottomTabNavigator<AuthStackParams>();

export const AuthScreenStack = () => {
  const token = new URLSearchParams(window.location.search).get("token") || "";

  return (
    <AuthStack.Navigator
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
        <AuthStack.Screen name="Register" component={RegisterScreen} />
      ) : (
        <AuthStack.Screen name="Login" component={LoginScreen} />
      )}
    </AuthStack.Navigator>
  );
};
