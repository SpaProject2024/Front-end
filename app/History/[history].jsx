import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import History from "../../components/History/history"

export default function Home() {
  return (
    <View style={styles.container}>
      <History />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


