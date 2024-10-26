import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import ReviewPage from "../../components/Review/review";

export default function Review() {
  return (
    <View style={styles.container}>
     <ReviewPage></ReviewPage>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


