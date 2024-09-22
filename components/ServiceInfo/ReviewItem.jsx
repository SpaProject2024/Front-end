import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { StarRatingDisplay } from "react-native-star-rating-widget";

export default function ReviewItem({ review }) {
  return (
    <View style={{ paddingBottom: 20 }}>
      <View style={styles.reviewItem}>
        <View style={styles.title}>
          <View style={{ paddingRight: 10 }}>
            <Image
              style={styles.picture}
              source={require("./../../assets/images/user.jpg")}
            />
          </View>

          <View style={{ justifyContent: "center" }}>
            <Text style={{fontWeight: "bold"}}>{review.name}</Text>
            <StarRatingDisplay
              style={{ marginVertical: 5 }}
              color="orange"
              starSize={16}
              rating={review.rate}
            />
          </View>
        </View>
        <Text style={{padding: 10, color: "grey"}}>{review.comment}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  reviewItem: {
    backgroundColor: "white",
    borderRadius: 10,
  },
  title: {
    backgroundColor: "#E6E5E3",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
    flexDirection: "row",
  },
  picture: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
});
