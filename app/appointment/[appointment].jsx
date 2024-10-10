import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import AppointmentPage from "../../components/Appointment/appointment";
export default function appointment() {
  return (
    <View style={styles.container}>
      <AppointmentPage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
