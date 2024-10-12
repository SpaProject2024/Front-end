import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import EditProflie from "../../components/EditProfile/editprofile"

export default function Home() {
  return (
    <View style={styles.container}>
     <EditProflie></EditProflie>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


