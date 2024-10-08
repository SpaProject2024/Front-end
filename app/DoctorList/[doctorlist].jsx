import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import DoctorLists from "../../components/DoctorList/DoctorList";

export default function DoctorList() {
  return (
    <View style={styles.container}>
      <DoctorLists />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


