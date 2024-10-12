import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import MyTabs from "../../components/Appointment/mytabs";
export default function appointment() {
  return (
    <View style={styles.container}>
      <MyTabs />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
