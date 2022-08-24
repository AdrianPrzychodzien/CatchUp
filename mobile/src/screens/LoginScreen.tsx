import React, { useState } from "react";
import { View } from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";
import { useUserContext } from "../context/user/user.context";

export const LoginScreen = () => {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useUserContext();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.backgroundColor,
      }}
    >
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoComplete="email"
        autoFocus
        mode="outlined"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        mode="outlined"
      />

      <Button
        onPress={() => signIn({ email, password })}
        disabled={!email || !password || email.length < 3 || password.length < 3}
        mode="contained-tonal"
        style={{ marginTop: 20 }}
      >
        Sign in
      </Button>
    </View>
  );
};
