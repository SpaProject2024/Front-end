import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../constants/Colors";

export default function ServiceItem({
  title,
  description,
  isFavorite,
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
            <Text style={{fontSize: 30}}>{title}</Text>
            <TouchableOpacity onPress={toggleFavorite}>
              <Ionicons
                name={isFavorite ? "heart-sharp" : "heart-outline"}
                size={20}
                color={Colors.PRIMARY}
              />
            </TouchableOpacity>
          </View>
          <StarRatingDisplay starSize={25} rating={4.5} />
          <Text
            style={styles.description}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {description}
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
  },
  title: {
    fontSize: 30,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    width: 390,
  },
  picture: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    width: 150,
    height: 150,
  },
});
