import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import MyAccount from "../../components/myAccount/myAccount";

export default function Home() {
  return (
    <View style={styles.container}>
      <MyAccount />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


