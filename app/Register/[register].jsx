import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import RegisterPage from "../../components/Register/register";

export default function Register() {
  return (
    <View style={styles.container}>
      <RegisterPage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
