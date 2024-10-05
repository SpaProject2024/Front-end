import { View, StyleSheet } from "react-native";
import React from "react";
import Confirmations from "../../components/Confirmation/confirmation";

export default function Confirmation() {
  return (
    <View style={styles.container}>
      <Confirmations />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
