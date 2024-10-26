import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Favorites from "../../components/favorites/favorites";

export default function Favorite() {
  return (
    <View style={styles.container}>
      <Favorites />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


