import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../constants/Colors";
import FilterPrice from "./FilterPrice";
import FilterRatting from "./FilterRatting";
import FilterCategory from "./FilterCategory";

export default function FilterService({ closeFilter, isFilterVisible }) {
  return (
    <View style={{flex: 1}}>
      <View>
        <Text style={styles.title}>Filter</Text>

        {/* <FilterCategory />
        <View style={styles.line} /> */}

        <FilterRatting />
        <View style={styles.line} />

        <FilterPrice />        
      </View>

      <View style={styles.buttonDirection}>
        {/* Filter Button */}
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>

        {/* Reset Button */}
        <TouchableOpacity style={{ padding: 10 }}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Close Button */}
      <Pressable style={styles.closeButton} onPress={closeFilter}>
        <Ionicons name="close" size={16} color="#333" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    // textAlign: "center",
    fontWeight: "bold",
    paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#F7F7F7',
  },
  closeButton: {
    position: "absolute",
    color: 'grey',
    top: 30,
    right: 22,
  },
  line: {
    height: 1, // Chiều cao của đường gạch ngang
    backgroundColor: "#d3d3d3", // Màu của đường gạch ngang
    marginVertical: 20, // Khoảng cách trên dưới
    width: "100%", // Chiều rộng của đường gạch ngang (full width)
  },
  filterButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: Colors.PRIMARY,
    marginTop: 10,
    marginHorizontal: 20,
  },
  buttonDirection: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  filterText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  resetText: {
    color: Colors.PRIMARY,
    fontWeight: "bold",
    textAlign: "center",
  },
});
