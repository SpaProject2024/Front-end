import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Review from "../../components/Review/review";

export default function Home() {
  return (
    <View style={styles.container}>
     <Review></Review>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


