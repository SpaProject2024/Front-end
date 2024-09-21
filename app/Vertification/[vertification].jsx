import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import VertificationPage from "../../components/Vertification/vertification";

export default function Vertification() {
  return (
    <View style={styles.container}>
      <VertificationPage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
