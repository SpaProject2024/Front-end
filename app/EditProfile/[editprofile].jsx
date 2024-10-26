import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import EditProfliePage from "../../components/EditProfile/editprofile"

export default function EditProfile() {
  return (
    <View style={styles.container}>
     <EditProfliePage></EditProfliePage>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


