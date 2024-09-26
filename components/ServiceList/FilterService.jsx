import {
  View,
  Text,
  StyleSheet,
  Modal,
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
    <View>
      <Modal
        // animationType="slide"
        transparent={true}
        visible={isFilterVisible}
      >
        {/* Lớp phủ để làm mờ nền */}
        <View style={styles.overlay} />

        <View style={styles.bottomView}>
          <View style={styles.modalView}>
            <View>
              {/* Title */}
              <Text style={styles.title}>Filter</Text>

              {/* Category */}
              <FilterCategory />

              <View style={styles.line} />

              {/* Ratting */}
              <FilterRatting />

              <View style={styles.line} />

              {/* Price */}
              <FilterPrice />

              {/* Filter Button */}
              <TouchableOpacity
                style={styles.filterButton}
                // onPress={}
              >
                <Text style={styles.filterText}>Filter</Text>
              </TouchableOpacity>

              {/* Reset Button */}
              <TouchableOpacity
                style={{ padding: 10 }}
                // onPress={}
              >
                <Text style={styles.resetText}>Reset</Text>
              </TouchableOpacity>
            </View>

            {/* Close Button */}
            <Pressable style={styles.closeButton} onPress={closeFilter}>
              <Ionicons name="close" size={16} color="#333" />
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontWeight: "bold",
    paddingBottom: 10,
  },
  backButton: {
    position: "absolute",
    top: 3,
    right: 5,
    borderRadius: 100,
  },
  bottomView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalView: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 0,
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "black",
    opacity: 0.5, // Điều chỉnh độ mờ cho hiệu ứng làm tối
  },
  closeButton: {
    position: "absolute",
    top: 22,
    right: 22,
  },
  line: {
    height: 1, // Chiều cao của đường gạch ngang
    backgroundColor: "#d3d3d3", // Màu của đường gạch ngang
    marginVertical: 10, // Khoảng cách trên dưới
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
