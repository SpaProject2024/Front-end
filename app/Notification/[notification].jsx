import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import NotificationPage from "../../components/Notification/notification";

export default function Notification() {
  return (
    <View style={styles.container}>
      <NotificationPage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
