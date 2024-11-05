import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function Header({ setFilterVisible }) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <View style={styles.header1}>
        <View style={{ flexDirection: "row" }}>
          <Ionicons
            name="arrow-back-outline"
            size={28}
            color="white"
            onPress={() => router.back()}
          />
          <Text style={styles.text}>Search</Text>
        </View>
        <Pressable onPress={setFilterVisible}>
          <Ionicons name="filter-circle" size={40} color="white" />
        </Pressable>
      </View>
      {/* <SearchService /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.PRIMARY,
    paddingTop: 40,
    padding: 10,
    height: 100,
  },
  header1: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  text: {
    color: "white",
    fontSize: 24,
    marginLeft: 10,
    marginTop: 2,
    paddingLeft: 10,
    alignContent: "center",
  },
  backIcon: {
    marginTop: 5,
  },
});
