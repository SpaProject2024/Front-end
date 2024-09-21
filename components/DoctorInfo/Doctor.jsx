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

export default function Doctor({ doctor }) {
  return (
    <View style={{ backgroundColor: "#F2F2F2" }}>
      <Image
        style={styles.picture}
        source={require("./../../assets/images/doctor.jpg")}
        resizeMode=""
      />

      {/* Name & Experience */}
      <View style={styles.div}>
        <Text style={styles.name}>{doctor.name}</Text>
        <Text style={styles.smallText}>
          {doctor.experience} year experience
        </Text>
        <StarRatingDisplay color="orange" starSize={20} rating={doctor.rate} />
      </View>

      {/* About */}
      <View style={styles.div}>
        <Text style={styles.title}>About</Text>
        <Text style={styles.smallText}>
          {doctor.description} year experience
        </Text>
      </View>

      {/* Photo */}
      <View style={styles.div}>
        <Text style={styles.title}>Photo</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  div: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  picture: {
    width: Dimensions.get("window").width,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5
  },
  name: {
    fontSize: 20,
    paddingBottom: 5,
    fontWeight: "bold",
  },
  smallText: {
    fontSize: 13,
    paddingLeft: 7,
    paddingBottom: 5,
    color: "#333",
  },
  favoriteIcon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 10,
  },
});
