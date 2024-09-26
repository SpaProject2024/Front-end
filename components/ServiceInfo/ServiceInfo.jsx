import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function ServiceInfo({ service }) {
  return (
    <View>
      {/* Description */}
      <View style={styles.div}>
        <Text style={styles.title}>About</Text>
        <Text>{service.description}</Text>
      </View>

      <View style={styles.line} />

      {/* Doctor */}
      <View style={styles.div}>
        <Text style={styles.title}>Doctor</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  div: {
    // backgroundColor: '#F2F2F2',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  line: {
    height: 3, // Chiều cao của đường gạch ngang
    backgroundColor: "#d3d3d3", // Màu của đường gạch ngang
    marginVertical: 10, // Khoảng cách trên dưới
    width: "100%", // Chiều rộng của đường gạch ngang (full width)
  },
});
