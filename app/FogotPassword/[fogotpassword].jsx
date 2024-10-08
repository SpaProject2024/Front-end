import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import FogetPassword from "../../components/FogotPassword/fogotpassword";

export default function ForgotpasswordPage() {
  return (
    <View style={styles.container}>
      <FogetPassword />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
