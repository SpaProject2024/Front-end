import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import HistoryPage from "../../components/History/history"

export default function History() {
  return (
    <View style={styles.container}>
     <HistoryPage></HistoryPage>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


