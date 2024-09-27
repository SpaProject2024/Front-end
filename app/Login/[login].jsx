import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import LoginPage from "../../components/Login/login";

export default function Login() {
  return (
    <View style={styles.container}>
      <LoginPage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
