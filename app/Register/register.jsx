import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import Logo from "../../assets/images/Neutral Feminine Flower Line Art.png";
import { useRouter } from "expo-router";
import { styles, buttonStyles } from "./styles";

const register = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setpasswordAgain] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // const validateEmail = (email) => {
  //   // Simple regex for email validation
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };

  const handleLogin = () => {
    let hasError = false;

    setEmailError("");
    setPasswordError("");

    if (!email && !password) {
      setEmailError("Email is required");
      setPasswordError("Password is required");
      hasError = true;
    } else {
      if (!email) {
        setEmailError("Email is required");
        hasError = true;
      } else if (!validateEmail(email)) {
        setEmailError("Email is invalid");
        hasError = true;
      }
      if (!password) {
        setPasswordError("Password is required");
        hasError = true;
      } else if (password.length < 6) {
        setPasswordError("Password must be at least 6 characters long");
        hasError = true;
      }
    }

    if (hasError) return;

    Alert.alert("Login Success", `Welcome ${email}`, [
      { text: "OK", onPress: () => router.push("/Home/home") },
    ]);
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.title}>Register</Text>
      <Text style={styles.text}>Welcome please create your account</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="Re-enter the password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => router.push("Fogetpassword/fogetpassword")}
        ></TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default register;
