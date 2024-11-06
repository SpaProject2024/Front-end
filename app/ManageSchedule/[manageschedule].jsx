import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import ManageWorkScheduleScreen from "../../components/ManageSchedule/manageschedule";

export default function ManagecheduleScreen() {
  return (
    <View style={styles.container}>
      <ManageWorkScheduleScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
