import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import SegmentedControl from "./../../components/ServiceInfo/SegmentedControl";
import SearchService from "./../../components/ServiceList/SearchService";

export default function serviceInfo() {
  const router = useRouter();
  // const navigation = useNavigation()
  const { service } = useLocalSearchParams();
  const parsedService = JSON.parse(decodeURIComponent(service));

  // const parsedService = service ? JSON.parse(service) : {};
  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.backButton}>
          <Ionicons
            name="arrow-back-outline"
            size={24}
            color="grey"
            onPress={() => router.back()}
          />
        </View>
        <View style={{ flex: 1 }}>
          <SearchService placeholder={parsedService.title}/>
        </View>
      </View>

      {/* Segmented Control */}
      <SegmentedControl
        values={["Information", "Review"]}
        service={parsedService}
      />

      {/* Back Button */}
      {/* <View style={styles.backButton}>
        <Ionicons
          name="arrow-back-outline"
          size={24}
          color="white"
          onPress={() => router.back()}
        />
      </View> */}

      {/* Book Button */}
      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.bookText}>BOOK APPOINTMENT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingTop: 30,
    padding: 20,
  },
  backButton: {
    justifyContent: "center",
    paddingRight: 10,
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
