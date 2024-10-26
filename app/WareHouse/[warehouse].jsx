import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import WarehousePage from "../../components/Warehouse/warehouse"

export default function Warehosue() {
  return (
    <View style={styles.container}>
    <WarehousePage></WarehousePage>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
