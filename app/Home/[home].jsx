import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Header from "../../components/Home/header";
import Data from "../../components/Home/data";

export default function Home() {
  return (
    <View style={styles.container}>
      <Header />
      <Data />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
