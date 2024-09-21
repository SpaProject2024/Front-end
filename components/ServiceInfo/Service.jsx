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
import SegmentedControl from './SegmentedControl';

export default function Service({ service }) {
  const [isFavorite, setIsFavorite] = useState(service.isFavorite);
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <View style={{ flex: 1 }}>
      <Image
        style={styles.picture}
        source={require("./../../assets/images/hasaki.jpg")}
        resizeMode="contain"
      />
      
      <View style={styles.title}>
        <View>
          <Text style={{ fontSize: 30 }}>{service.title}</Text>
          <StarRatingDisplay starSize={25} rating={4.5} />
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

      <SegmentedControl values={['Information', 'Review']}/>

      <Text style={styles.bookButton}>BOOK APPOINTMENT</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  picture: {
    width: Dimensions.get("window").width,
    height: 600,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F2F2F2",
    padding: 20,
  },
  favoriteIcon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 10,
  },
  bookButton: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.PRIMARY,    
    padding: 20,
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
    textAlign:"center"
  },
});
