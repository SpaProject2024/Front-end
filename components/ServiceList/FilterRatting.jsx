import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function FilterRatting() {
  const ratting = [];

  for (let i = 5; i >= 1; i--) {
    // Bắt đầu từ index 4 (Item 5) đến 0 (Item 1)
    ratting.push(
      <TouchableOpacity key={i} style={styles.rattingBox}>
        <Text>{i} </Text>
        <Ionicons name="star-outline" size={16} color="black" />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ratting</Text>
      <View style={styles.content}>{ratting}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: "bold"
  },
  rattingBox: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    elevation: 3,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 7,
  },
});
