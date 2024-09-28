import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import ServiceInfo from "./ServiceInfo";
import Review from "./ServiceReview";

export default function SegmentedControl({ values, service }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <View>
      {/* Segmented Control */}
      <View style={styles.segmentedControl}>
        {values.map((value, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.segment,
              selectedIndex === index && styles.selectedSegment,
            ]}
            onPress={() => setSelectedIndex(index)}
          >
            <Text
              style={[
                styles.text,
                selectedIndex === index && styles.selectedText,
              ]}
            >
              {value}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Display */}
      {values[selectedIndex] === "Information" ? <ServiceInfo service={service} /> : <Review service={service} />}
    </View>
  );
}

const styles = StyleSheet.create({
  segmentedControl: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 5,
    overflow: "hidden",
    elevation: 5,
  },
  segment: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 0, // Mặc định không có viền
  },
  selectedSegment: {
    borderBottomWidth: 2, // Tạo viền dưới khi được chọn
    borderBottomColor: Colors.PRIMARY, // Màu của viền dưới
  },
  text: {
    fontSize: 18, // Điều chỉnh size chữ ở đây
    color: "grey"
  },
  selectedText: {
    color: Colors.PRIMARY, // Màu chữ khi được chọn
    fontWeight: "bold",
    // textDecorationLine: 'underline', // Gạch dưới khi được chọn
  },
});
