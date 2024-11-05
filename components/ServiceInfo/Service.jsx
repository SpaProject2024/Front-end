import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../constants/Colors";
import DoctorList from "./../DoctorList/DoctorList";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Service({ service }) {
  const [isFavorite, setIsFavorite] = useState(service.isFavorite);
  const router = useRouter();

  const handleBookAppointment = async () => {
    try {
      await AsyncStorage.setItem("serviceIds", service._id); // Save serviceId with key 'serviceId'
      console.log("Saved Service ID:", service._id);
      router.push("/dateappointment/dateappointment");
    } catch (error) {
      console.error("Error saving service ID:", error);
    }
  };

  const toggleFavorite = (id) => {
    console.log("Service ID:", id);
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.picture} source={{ uri: service.image }} />
      <View style={styles.titleContainer}>
        <View>
          <Text style={styles.title}>{service.name}</Text>
          <StarRatingDisplay color="orange" starSize={20} rating={service.averageRating} />
        </View>
        <TouchableOpacity
          style={styles.favoriteIcon}
          onPress={() => toggleFavorite(service._id)}
        >
          <Ionicons name={isFavorite ? "heart-sharp" : "heart-outline"} size={30} color={Colors.PRIMARY} />
        </TouchableOpacity>
      </View>
      <Text style={styles.duration}>Duration: {service.duration}</Text>
      <View style={styles.div}>
        <Text style={styles.title}>About</Text>
        <Text style={{ fontSize: 13 }}>{service.description}</Text>
      </View>
      <View style={styles.line} />
        <View style={styles.div}>
          <DoctorList />
        </View>
      <TouchableOpacity style={styles.bookDirection} onPress={handleBookAppointment}>
        <Text style={styles.bookButton}>BOOK APPOINTMENT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  picture: {
    width: "100%",
    height: Dimensions.get("window").height * 0.25,
  },
  div: {
    padding: 20,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  title: {
    fontSize: 15,
    paddingBottom: 5,
    fontWeight: "bold",
  },
  duration: {
    marginLeft: 20,
    fontSize: 15,
    paddingBottom: 5,
    fontWeight: "bold",
  },
  favoriteIcon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 10,
  },
  line: {
    height: 3,
    backgroundColor: "#d3d3d3",
    marginVertical: 5,
    width: "100%",
  },
  bookDirection: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.PRIMARY,
  },
  bookButton: {
    padding: 15,
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  container: {
    flex: 1,
    paddingBottom: 60,
  },
});
