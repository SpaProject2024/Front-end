import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import ServiceList from "./../../components/ServiceList/ServiceList";
import FilterService from "./../../components/ServiceList/FilterService";
import SearchService from "./../../components/ServiceList/SearchService";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import {Colors} from '../../constants/Colors'

export default function _layout() {
  const router = useRouter();
  return (
    <View style={{flex: 1}}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.header1}>
          <View style={{ flexDirection: "row" }}>
            <Ionicons
              name="arrow-back-outline"
              size={28}
              color="white"
              onPress={() => router.push("/Home/home")}
            />
            <Text style={styles.text}>Search</Text>
          </View>
          <FilterService />
        </View>
        <SearchService />
      </View>

      {/* List of services */}
      <ServiceList />
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
    paddingBottom: 10
  },
  text: {
    color: "white",
    fontSize: 24,
    paddingLeft: 10,
    alignContent: "center",
  },
});
