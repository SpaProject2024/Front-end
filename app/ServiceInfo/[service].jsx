import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import ServiceInfo from "./../../components/ServiceInfo/Service";
import { Colors } from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function serviceInfo() {
  const router = useRouter();
  // const navigation = useNavigation()
  const { service } = useLocalSearchParams();
  const parsedService = service ? JSON.parse(service) : {};
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* Service Information */}
      <ServiceInfo service={parsedService} />

      {/* Back Button */}
      <View style={styles.backButton}>
        <Ionicons
          name="arrow-back-outline"
          size={28}
          color="white"
          onPress={() => router.push("/ServiceList/")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    backgroundColor: "rgba(128, 128, 128, 0.5)",
    borderRadius: 100,
    padding: 10,
  },
});
