import { View, StyleSheet } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import SearchService from "./../../components/ServiceList/SearchService";

export default function Header({service}) {
  const router = useRouter();

  return (
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
        <SearchService placeholder={service.title} />
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
  },
  backButton: {
    justifyContent: "center",
    paddingRight: 10,
  },
});
