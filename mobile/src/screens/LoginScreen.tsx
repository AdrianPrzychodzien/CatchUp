import React, { useState } from "react";
import { Button, View } from "react-native";
import { useUserContext } from "../context/user/user.context";
import { TextInput } from "react-native-paper";

export const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useUserContext();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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

      <View style={{ marginTop: 20 }}>
        <Button
          title="Sign in"
          onPress={() => signIn({ email, password })}
          disabled={!email || !password || email.length < 3 || password.length < 3}
        />
      </View>
    </View>
  );
};
