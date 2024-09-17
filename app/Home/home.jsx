import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Header from "./header";
import Data from "./data";
import Footer from "./footer";

export default function Home() {
  return (
    <View style={styles.container}>
      <Header/>
      <Data />
      <Footer/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "##C0E3C5",
  },
});
