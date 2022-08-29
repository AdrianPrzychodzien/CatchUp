import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import SafeAreaView from 'react-native-safe-area-view';
import UserContextProvider, { useUserContext } from "./src/context/user/user.context";
import { AppScreenStack } from "./src/navigation/AppScreenStack";
import { AuthScreenStack } from "./src/navigation/AuthScreenStack";
import { theme } from "./src/styles/theme.styles";

const AppInner = () => {
  const { userId } = useUserContext();

  return (
    <NavigationContainer>
      {userId && <AppScreenStack />}
      {!userId && <AuthScreenStack />}
    </NavigationContainer>
  );
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
