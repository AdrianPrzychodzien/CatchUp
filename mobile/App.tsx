import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
// import SafeAreaView from 'react-native-safe-area-view';
import UserContextProvider, { useUserContext } from "./src/context/user/user.context";
import { DeckScreen } from "./src/screens/DeckScreen";
import { LoginScreen } from "./src/screens/LoginScreen";
import { HomeScreen } from "./src/screens/HomeScreen";
import { RegisterScreen } from "./src/screens/RegisterScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackComponent = () => {
  const { userId } = useUserContext();

  return (
    <>
      {userId ? (
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
              let iconName;
              let rn = route.name;

              if (rn === "Home") {
                iconName = "home";
              } else if (rn === "Deck") {
                iconName = "list";
              } else if (rn === "Login") {
                iconName = "account";
              }

              if (iconName) {
                return <Icon name={iconName} size={26} color={focused ? "black" : "gray"} />;
              }
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Deck" component={DeckScreen} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      )}
    </>
  );
};

export default function App() {
  const isRegisterRoute = window.location.pathname === "/register";

  return (
    <PaperProvider>
      <UserContextProvider>
        <NavigationContainer>
          {isRegisterRoute ? (
            <Stack.Navigator>
              <Stack.Screen name="Register" component={RegisterScreen} />
            </Stack.Navigator>
          ) : (
            <StackComponent />
          )}
        </NavigationContainer>
      </UserContextProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  heading: {
    color: "#000",
  },
});
