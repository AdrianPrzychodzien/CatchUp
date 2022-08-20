import React, { useState } from "react";
import { Button, SafeAreaView, View } from "react-native";
import { useUserContext } from "../context/user/user.context";
import { TextInput } from "react-native-paper";

export const RegisterScreen = () => {
  const tokenParam = new URLSearchParams(window.location.search).get("token") || "";

  const [token, setToken] = useState(tokenParam);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const { signUp } = useUserContext();

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View>
        <TextInput placeholder="Token" value={token} onChangeText={setToken} />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoComplete="email"
          autoFocus
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          placeholder="Password confirmation"
          value={passwordConfirmation}
          onChangeText={setPasswordConfirmation}
          secureTextEntry
        />

        <View style={{ marginTop: 20 }}>
          <Button
            title="Sign up"
            onPress={() => signUp({ token, email, password, passwordConfirmation })}
            disabled={!email || !password || email.length < 3 || password.length < 3}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
