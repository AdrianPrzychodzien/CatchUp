import { View } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { useUserContext } from "../context/user/user.context";
import { HomeScreenProps } from "../navigation/types";

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const theme = useTheme();
  const { signOut } = useUserContext();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.backgroundColor,
      }}
    >
      <Button
        mode="contained-tonal"
        onPress={() => navigation.navigate("DecksStack", { screen: "Decks" })}
        style={{ marginBottom: 12 }}
      >
        Go to Decks
      </Button>
      <Button mode="contained-tonal" onPress={signOut}>
        Logout
      </Button>
    </View>
  );
};
