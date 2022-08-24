import { View } from "react-native";
import { Button } from "react-native-paper";
import { useUserContext } from "../context/user/user.context";
import { HomeScreenProps } from "../navigation/types";

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { signOut } = useUserContext();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        mode="contained-tonal"
        onPress={() => navigation.navigate("DecksStack", { screen: "Decks" })}
      >
        Go to Decks
      </Button>
      <Button mode="contained-tonal" onPress={signOut}>
        Logout
      </Button>
    </View>
  );
};
