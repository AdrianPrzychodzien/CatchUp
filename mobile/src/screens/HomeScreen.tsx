import { Button, SafeAreaView, Text, View } from "react-native";
import { useUserContext } from "../context/user/user.context";

export const HomeScreen = ({ navigation }: any) => {
  const { signOut } = useUserContext();

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "space-between", alignItems: "center" }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen</Text>
        <Button title="Go to Decks" onPress={() => navigation.navigate("Decks")} />
        <Button title="Logout" onPress={() => signOut()} />
      </View>
    </SafeAreaView>
  );
};
