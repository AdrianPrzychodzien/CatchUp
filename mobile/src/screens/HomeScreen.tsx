import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView, View } from "react-native";
import { Button } from "react-native-paper";
import { useUserContext } from "../context/user/user.context";
import { RootStackParams } from "../types/stack.types";

type HomeScreenProps = NativeStackNavigationProp<RootStackParams>;

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenProps>();
  const { signOut } = useUserContext();

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "space-between", alignItems: "center" }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button onPress={() => navigation.navigate("DecksStack", { screen: "Decks" })}>
          Go to Decks
        </Button>
        <Button onPress={signOut}>Logout</Button>
      </View>
    </SafeAreaView>
  );
};
