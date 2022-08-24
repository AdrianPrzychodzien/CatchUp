import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// import SafeAreaView from 'react-native-safe-area-view';
import UserContextProvider, { useUserContext } from "./src/context/user/user.context";
import { AppScreenStack } from "./src/navigation/AppScreenStack";
import { AuthScreenStack } from "./src/navigation/AuthScreenStack";

const AppInner = () => {
  const { userId } = useUserContext();

  return (
    <NavigationContainer>
      {userId && <AppScreenStack />}
      {!userId && <AuthScreenStack />}
    </NavigationContainer>
  );
};

const theme = {
  ...DefaultTheme,
  roundness: 2,
  version: 3,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3498db",
    secondary: "#f1c40f",
    tertiary: "#a1b2c3",
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <UserContextProvider>
          <AppInner />
        </UserContextProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
