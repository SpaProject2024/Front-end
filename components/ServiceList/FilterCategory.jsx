import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function FilterCategory() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Category</Text>
      <View style={styles.content}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: "bold",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 7,
  },
});
