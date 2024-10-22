import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { Colors } from "../../constants/Colors";
import SegmentedControl from "./../../components/ServiceInfo/SegmentedControl";
import Header from "../../components/ServiceInfo/Header";

export default function serviceInfo() {
  const { service } = useLocalSearchParams();
  const parsedService = JSON.parse(decodeURIComponent(service));

  return (
    <View style={{ flex: 1 }}>
      <Header service={parsedService} />

      <SegmentedControl
        values={["Information", "Review"]}
        service={parsedService}
      />

      {/* Book Button */}
      <TouchableOpacity style={styles.bookDirection}>
        <Text style={styles.bookButton}>BOOK APPOINTMENT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bookDirection: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  bookButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
