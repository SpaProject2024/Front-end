import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import Logo from "../../assets/images/logo2.png";
import { useRouter } from "expo-router";
import { styles, buttonStyles } from "./styles";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    // Simple regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

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
      <Text style={styles.title}>Login</Text>
      <Text style={styles.text}>Please enter your email and password</Text>
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

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => router.push("Fogetpassword/fogetpassword")}
        >
          <Text style={styles.linkText}>
            Forgot your password?
            <Text style={styles.fogotText}>Password recovery here</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[buttonStyles.baseButton, styles.button]}
          onPress={() => router.push("Register/register")}
        >
          <Text style={[buttonStyles.textButton, styles.registerText]}>
            Don't have an account? Register here
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>
      <Text style={styles.orText}>OR</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[buttonStyles.baseButton, buttonStyles.facebookButton]}
          onPress={() => router.push("Fogetpassword/fogetpassword")}
        >
          <Text style={buttonStyles.textButton}>Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[buttonStyles.baseButton, buttonStyles.googleButton]}
          onPress={() => router.push("Register/register")}
        >
          <Text style={buttonStyles.textButton}>Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
