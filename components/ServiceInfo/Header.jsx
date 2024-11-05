import { View, StyleSheet, Text } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import SearchService from "./../../components/ServiceList/SearchService";

export default function Header({ service }) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <View style={styles.backButton}>
        <View style={{ flexDirection: "row" }}>
          <Ionicons
            style={styles.backIcon}
            name="arrow-back-outline"
            size={24}
            color="grey"
            onPress={() => router.back()}
          />
          <Text style={styles.text}>Services Detail</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingTop: 30,
    padding: 20,
    backgroundColor: "#2B5F2F",
  },
  backButton: {
    justifyContent: "center",
    paddingRight: 10,
  },
  backIcon: {
    marginTop: 5,
  },
  text: {
    color: "#ffffff",
    fontSize: 24,
    marginLeft: 10,
    marginTop: 2,
    paddingLeft: 10,
    alignContent: "center",
  },
});
