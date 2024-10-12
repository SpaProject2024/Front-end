import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import HelpSupport from "../../components/helpSupport/helpSupport";

export default function Home() {
  return (
    <View style={styles.container}>
      <HelpSupport />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


