import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import ServiceInfo from "./../../components/ServiceInfo/Service";
import { Colors } from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import SegmentedControl from "./../../components/ServiceInfo/SegmentedControl";

export default function serviceInfo() {
  const router = useRouter();
  // const navigation = useNavigation()
  const { service } = useLocalSearchParams();
  const parsedService = JSON.parse(decodeURIComponent(service));

  // const parsedService = service ? JSON.parse(service) : {};
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}>
        {/* Service Information */}
        <ServiceInfo service={parsedService} />

        {/* Segmented Control */}
        <SegmentedControl
          values={["Information", "Review"]}
          service={parsedService}
        />
      </ScrollView>

      {/* Back Button */}
      <View style={styles.backButton}>
        <Ionicons
          name="arrow-back-outline"
          size={24}
          color="white"
          onPress={() => router.back()}
        />
      </View>

      {/* Book Button */}
      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.bookText}>BOOK APPOINTMENT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 30,
    left: 10,
    backgroundColor: "rgba(128, 128, 128, 0.5)",
    borderRadius: 100,
    padding: 10,
  },
  bookButton: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  bookText: {
    backgroundColor: Colors.PRIMARY,
    padding: 10,
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
