import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import FogetpasswordPage from "../../components/Fogetpassword/fogetpassword";

export default function Home() {
  return (
    <View style={styles.container}>
      <FogetpasswordPage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
