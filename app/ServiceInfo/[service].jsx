import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useLocalSearchParams, useNavigation } from "expo-router"; // Import useNavigation
import { Colors } from "../../constants/Colors";
import SegmentedControl from "./../../components/ServiceInfo/SegmentedControl";
import Header from "../../components/ServiceInfo/Header";
export default function serviceInfo() {
  const { service } = useLocalSearchParams();
  const parsedService = JSON.parse(decodeURIComponent(service));


  return (
    <View style={styles.container}>
      <Header service={parsedService} />
      <SegmentedControl
        values={["Information", "Review"]}
        service={parsedService}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

