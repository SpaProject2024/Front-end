import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import ManagerDoctorsPage from "../../components/ManagerDoctors/managerdoctor";

export default function ManagerPage() {
  return (
    <View style={styles.container}>
      <ManagerDoctorsPage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
