import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../constants/Colors";

export default function ServiceItem({
  service,
  onServicePress,
  toggleFavorite,
}) {
  return (
    <TouchableOpacity onPress={onServicePress}>
      <View style={styles.item}>
        <Image
          style={styles.picture}
          source={require("./../../assets/images/hasaki.jpg")}
        />
        <View style={styles.info}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
              {service.title}
            </Text>
            <TouchableOpacity
              style={{ justifyContent: "center" }}
              onPress={toggleFavorite}
            >
              <Ionicons
                name={service.isFavorite ? "heart-sharp" : "heart-outline"}
                size={20}
                color={Colors.PRIMARY}
              />
            </TouchableOpacity>
          </View>
          <StarRatingDisplay
            style={{ marginVertical: 5 }}
            color="orange"
            starSize={16}
            rating={service.rate}
          />
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
    fontWeight: "bold"
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
});
