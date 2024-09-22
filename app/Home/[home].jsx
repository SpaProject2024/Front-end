import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Header from "../../components/Home/header";
import Data from "../../components/Home/data";
import Footer from "../Profile/Footer"; // Giả sử bạn đã tạo một component Footer

export default function Home() {
  return (
    <View style={styles.container}>
      <Header />
      <Data />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
