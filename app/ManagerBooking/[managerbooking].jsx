import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import ManagerBookingPage from "../../components/ManagerBooking/managerbooking.jsx";

export default function ManagerBooking() {
  return (
    <View style={styles.container}>
      <ManagerBookingPage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
