import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function FilterCategory() {
  return (
    <View style={styles.container}>
      <Text>Category</Text>
      <View style={styles.content}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 7,
  },
});
