import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import SecondaryPinPage from "../../components/SecondaryPin/secondarypin";

export default function SecondaryPin() {
  return (
    <View style={styles.container}>
      <SecondaryPinPage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
