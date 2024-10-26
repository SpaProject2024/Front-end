import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import DashboardPage from "../../components/Dashboard/Dashboard"

export default function Dashboard() {
  return (
    <View style={styles.container}>
     <DashboardPage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


