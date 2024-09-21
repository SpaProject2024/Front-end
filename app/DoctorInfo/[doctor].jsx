import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Doctor from "./../../components/DoctorInfo/Doctor";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../constants/Colors";

export default function doctorInfo() {
  const router = useRouter();
  const { doctor } = useLocalSearchParams();
  const parsedDoctor = JSON.parse(decodeURIComponent(doctor));

  return (
    <View style={{ flex: 1 }}>
      {/* Doctor Profile */}
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 70 }}>
        <Doctor doctor={parsedDoctor} />
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
