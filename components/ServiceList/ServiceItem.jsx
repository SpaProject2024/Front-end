import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

export default function ServiceItem({
  service,
  onServicePress,
}) {
  const [isFavorite, setIsFavorite] = useState(service.isFavorite);
  const toggleFavorite = (id) => {
    console.log("Service ID:", id);
    setIsFavorite(!isFavorite);
  };
  return (
    <TouchableOpacity onPress={onServicePress}>
      <View style={styles.item}>
        <Image style={styles.picture} source={{ uri: service.image }} />
        <View style={styles.info}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
              {service.name}
            </Text>
            <TouchableOpacity
              style={{ justifyContent: "center" }}
              onPress={() => toggleFavorite(service._id)}
            >
              <Ionicons
                name={isFavorite ? "heart-sharp" : "heart-outline"}
                size={20}
                color={Colors.PRIMARY}
              />
            </TouchableOpacity>
          </View>
          <StarRatingDisplay
            style={{ marginVertical: 5 }}
            color="orange"
            starSize={16}
            rating={service.rate} // Sử dụng rate để hiển thị sao
          />
          <Text style={styles.ratingText}>{service.averageRating} / 5</Text>
          <Text
            style={styles.description}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {service.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 5,
  },
  info: {
    padding: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    width: 160,
    fontWeight: "bold",
  },
  description: {
    fontSize: 13,
    lineHeight: 16,
    width: 180,
    color: "grey",
  },
  picture: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    width: 120,
    height: 120,
  },
  ratingText: {
    fontSize: 14,
    color: "grey",
    marginVertical: 5,
  },
});
