import { View, Text, StyleSheet, TouchableOpacity,Pressable } from "react-native";
import React, { useState } from "react";
import ServiceList from "../../components/ServiceList/ServiceList";
import FilterService from "../../components/ServiceList/FilterService";
import SearchService from "../../components/ServiceList/SearchService";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";

export default function _layout() {
  const router = useRouter();
  const [isFilterVisible, setFilterVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
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
          <Pressable onPress={() => setFilterVisible(!isFilterVisible)}>
            <Ionicons name="filter-circle" size={40} color="white" />
          </Pressable>
        </View>
        <SearchService />
      </View>

      {/* List of services */}
      <ServiceList />

      {/* Filter */}
      <FilterService
        closeFilter={() => setFilterVisible(!isFilterVisible)}
        isFilterVisible={isFilterVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.PRIMARY,
    paddingTop: 30,
    padding: 20,
  },
  header1: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  text: {
    color: "white",
    fontSize: 24,
    paddingLeft: 10,
    alignContent: "center",
  },
  filterContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
  },
});
