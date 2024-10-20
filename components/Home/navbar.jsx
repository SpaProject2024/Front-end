import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import Swiper from "react-native-swiper";
import { useRouter } from "expo-router";
import Carousel1 from "../../assets/images/carousel1.jpg";
import Carousel2 from "../../assets/images/carousel2.jpg";
import Carousel3 from "../../assets/images/carousel3.jpg";
import Menu from "../../assets/images/menu.png";
import Schedule from "../../assets/images/schedule.png";
import Handbook from "../../assets/images/handbook.png";
import Spa from "../../assets/images/spa.png";
import Doctor from "../../assets/images/doctor.png";
import Cosmetic from "../../assets/images/cosmetic.png";

const carouselItems = [
  {
    id: "1",
    image: Carousel1,
  },
  {
    id: "2",
    image: Carousel2,
  },
  {
    id: "3",
    image: Carousel3,
  },
];

const Navbar = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Carousel */}
      <Swiper
        showsButtons={false}
        autoplay
        loop
        style={styles.swiper}
        paginationStyle={styles.pagination}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
      >
        {carouselItems.map((item) => (
          <View key={item.id} style={styles.carouselItem}>
            <Image source={item.image} style={styles.carouselImage} />
          </View>
        ))}
      </Swiper>
      <View style={styles.header}></View>
      <View style={styles.rowCategory}>
        <View style={styles.categoryItem}>
          <View style={styles.imageWrapper}>
            <Image source={Menu} style={styles.location} />
          </View>
          <Text style={styles.text}>Menu</Text>
        </View>
        <View style={styles.categoryItem}>
          <View style={styles.imageWrapper}>
            <Image source={Spa} style={styles.location} />
          </View>
          <Text style={styles.text}>Clinic & Spa</Text>
        </View>
        <View style={styles.categoryItem}>
          <View style={styles.imageWrapper}>
            <Image source={Schedule} style={styles.location} />
          </View>
          <Text style={styles.text}>Schedule</Text>
        </View>
        <TouchableOpacity
          style={styles.categoryItem}
          onPress={() => router.push("/ManagerDoctors/managerdoctor")} // Correct navigation method
        >
          <View style={styles.imageWrapper}>
            <Image source={Doctor} style={styles.location} />
          </View>
          <Text style={styles.text}>Doctor</Text>
        </TouchableOpacity>
        <View style={styles.categoryItem}>
          <View style={styles.imageWrapper}>
            <Image source={Cosmetic} style={styles.location} />
          </View>
          <Text style={styles.text}>Cosmetic</Text>
        </View>
        <View style={styles.categoryItem}>
          <View style={styles.imageWrapper}>
            <Image source={Handbook} style={styles.location} />
          </View>
          <Text style={styles.text}>Handbook</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2B5F2F",
    height: 250,
  },

  swiper: {
    overflow: "visible",
    position: "absolute",
  },
  carouselItem: {
    flex: 1,
    alignItems: "center",
  },
  carouselImage: {
    width: "100%",
    height: 160,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowCategory: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  categoryItem: {
    alignItems: "center",
  },
  imageWrapper: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#fff",
    bottom: 10,
  },
  text: {
    fontSize: 12,
    color: "#fff",
    marginTop: 5,
    bottom: 10,
  },

  input: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 10,
  },

  location: {
    width: 25,
    height: 25,
    tintColor: "#C0E3C5",
  },
  dotStyle: {
    backgroundColor: "#C0E3C5",
    width: 14,
    height: 2,
  },
  activeDotStyle: {
    backgroundColor: "#00A67D",
    width: 14,
    height: 2,
    borderRadius: 4,
  },
});

export default Navbar;
