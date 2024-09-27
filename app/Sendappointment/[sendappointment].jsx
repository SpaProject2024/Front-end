import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Sendappointment from "../../components/Sendappointment/sendappointment";

export default function sendappointment() {
  return (
    <View style={styles.container}>
      <Sendappointment />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
