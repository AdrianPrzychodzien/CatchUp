import React, { useState } from "react";
import { View } from "react-native";
import { useUserContext } from "../context/user/user.context";
import { Button, TextInput } from "react-native-paper";

export const RegisterScreen = () => {
  const tokenParam = new URLSearchParams(window.location.search).get("token") || "";

  const [token, setToken] = useState(tokenParam);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const { signUp } = useUserContext();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput placeholder="Token" value={token} onChangeText={setToken} mode="outlined" />
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
      <TextInput
        placeholder="Password confirmation"
        value={passwordConfirmation}
        onChangeText={setPasswordConfirmation}
        secureTextEntry
        mode="outlined"
      />

      <Button
        onPress={() => signUp({ token, email, password, passwordConfirmation })}
        disabled={!email || !password || email.length < 3 || password.length < 3}
        mode="contained-tonal"
        style={{ marginTop: 20 }}
      >
        Sign up
      </Button>
    </View>
  );
};
