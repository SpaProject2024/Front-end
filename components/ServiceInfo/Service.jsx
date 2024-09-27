import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../constants/Colors";

export default function Service({ service }) {
  const [isFavorite, setIsFavorite] = useState(service.isFavorite);
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={{ backgroundColor: "#F2F2F2" }}>
      <Image
        style={styles.picture}
        source={require("./../../assets/images/hasaki.jpg")}
        resizeMode=""
      />

      <View style={styles.titleContainer}>
        <View>
          <Text style={styles.title}>
            {service.title}
          </Text>
          <StarRatingDisplay
            color="orange"
            starSize={20}
            rating={service.rate}
          />
        </View>
        <TouchableOpacity
          style={styles.favoriteIcon}
          onPress={() => toggleFavorite()}
        >
          <Ionicons
            name={isFavorite ? "heart-sharp" : "heart-outline"}
            size={30}
            color={Colors.PRIMARY}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  picture: {
    width: Dimensions.get("window").width,
    // height: 600,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  title: {
    fontSize: 20,
    paddingBottom: 5,
    fontWeight: "bold",
  },
  favoriteIcon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 10,
  },
});
