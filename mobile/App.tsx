import React, { useMemo } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
// import SafeAreaView from 'react-native-safe-area-view';
import { Headline, Provider as PaperProvider } from "react-native-paper";
import { DeckScreen } from "./src/screens/DeckScreen";
import { LoginScreen } from "./src/screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserContextProvider, { useUserContext } from "./src/context/user/user.context";

const AppContext = React.createContext({
  isSignedIn: false,
  setIsSignedIn: () => {},
});

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button title="Go to Deck" onPress={() => navigation.navigate("Deck")} />
    </View>
  );
}

const StackComponent = () => {
  const { userId } = useUserContext();

  return (
    <Stack.Navigator initialRouteName="Home">
      {userId ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Deck" component={DeckScreen} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <StackComponent />
      </NavigationContainer>
    </UserContextProvider>
  );
  // return (
  //   <PaperProvider>
  //     <SafeAreaView style={styles.container}>
  //       <Headline style={styles.heading}>Hello, World!</Headline>
  //       <View>
  //         <DeckScreen />
  //       </View>
  //     </SafeAreaView>
  //   </PaperProvider>
  // );
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
