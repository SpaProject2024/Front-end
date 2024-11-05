import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Hometabs from "../../components/Home/hometab";
export default function appointment() {
  return (
    <View style={styles.container}>
      <Hometabs />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
