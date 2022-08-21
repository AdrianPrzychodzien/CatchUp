import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// import SafeAreaView from 'react-native-safe-area-view';
import UserContextProvider, { useUserContext } from "./src/context/user/user.context";
import { AuthScreenStack } from "./src/stacks/AuthScreenStack";
import { AppScreenStack } from "./src/stacks/AppScreenStack";

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
      <PaperProvider>
        <UserContextProvider>
          <AppInner />
        </UserContextProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
