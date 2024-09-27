import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import Slider from "@react-native-community/slider";
import { Colors } from "../../constants/Colors";

export default function FilterPrice() {
  const [value, setValue] = useState(1);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Price</Text>
        <Text style={styles.price}>$0 - ${value}</Text>
      </View>
      <Slider
        style={{ height: 30 }}
        minimumValue={1} // Giá trị tối thiểu
        maximumValue={100} // Giá trị tối đa
        minimumTrackTintColor={Colors.PRIMARY} // Màu thanh trượt bên trái
        // maximumTrackTintColor={Colors.PRIMARY} // Màu thanh trượt bên phải
        thumbTintColor={Colors.PRIMARY} // Màu của nút kéo
        step={1} // Giá trị bước nhảy (1 là nhảy từng đơn vị)
        value={value} // Giá trị mặc định
        onValueChange={(val) => setValue(val)} // Sự kiện khi giá trị thay đổi
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold"
  },
  price: {
    fontSize: 13, 
    color: "grey"
  }
});
