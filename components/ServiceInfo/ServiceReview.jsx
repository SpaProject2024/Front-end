import { View, Text, FlatList } from "react-native";
import React from "react";
import ReviewItem from "./ReviewItem";

export default function ServiceReview({ service }) {
  return (
    <View style={{paddingBottom:240}}>
      <FlatList
        style={{padding: 20}}
        data={service.review}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
