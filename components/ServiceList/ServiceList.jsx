import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../constants/Colors";

const serviceList = [
  {
    id: "1",
    title: "First Item",
    image: "",
    type: "A",
    description:
      "A performant interface for rendering basic, flat lists, supporting the most handy feature. A performant interface for rendering basic, flat lists, supporting the most handy feature",
    isFavorite: true,
  },
  {
    id: "2",
    title: "Second Item",
    image: "",
    type: "B",
    description:
      "A performant interface for rendering basic, flat lists, supporting the most handy feature. A performant interface for rendering basic, flat lists, supporting the most handy feature",
    isFavorite: false,
  },
  {
    id: "3",
    title: "Third Item",
    image: "",
    type: "C",
    description:
      "A performant interface for rendering basic, flat lists, supporting the most handy feature. A performant interface for rendering basic, flat lists, supporting the most handy feature",
    isFavorite: false,
  },
  {
    id: "4",
    title: "First Item",
    image: "",
    type: "A",
    description:
      "A performant interface for rendering basic, flat lists, supporting the most handy feature. A performant interface for rendering basic, flat lists, supporting the most handy feature",
    isFavorite: false,
  },
  {
    id: "5",
    title: "Second Item",
    image: "",
    type: "B",
    description:
      "A performant interface for rendering basic, flat lists, supporting the most handy feature. A performant interface for rendering basic, flat lists, supporting the most handy feature",
    isFavorite: false,
  },
  {
    id: "6",
    title: "Third Item",
    image: "",
    type: "C",
    description:
      "A performant interface for rendering basic, flat lists, supporting the most handy feature. A performant interface for rendering basic, flat lists, supporting the most handy feature",
    isFavorite: false,
  },
  {
    id: "7",
    title: "First Item",
    image: "",
    type: "A",
    description:
      "A performant interface for rendering basic, flat lists, supporting the most handy feature. A performant interface for rendering basic, flat lists, supporting the most handy feature",
    isFavorite: false,
  },
  {
    id: "8",
    title: "Second Item",
    image: "",
    type: "B",
    description:
      "A performant interface for rendering basic, flat lists, supporting the most handy feature. A performant interface for rendering basic, flat lists, supporting the most handy feature",
    isFavorite: false,
  },
  {
    id: "9",
    title: "Third Item",
    image: "",
    type: "C",
    description:
      "A performant interface for rendering basic, flat lists, supporting the most handy feature. A performant interface for rendering basic, flat lists, supporting the most handy feature",
    isFavorite: false,
  },
  {
    id: "10",
    title: "Third Item",
    image: "",
    type: "C",
    description:
      "A performant interface for rendering basic, flat lists, supporting the most handy feature. A performant interface for rendering basic, flat lists, supporting the most handy feature",
    isFavorite: false,
  },
];

const initialServiceList = serviceList

export default function ServiceList() {
  const [serviceList, setServiceList] = useState(initialServiceList);

  const toggleFavorite = (id) => {
    setServiceList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const Item = ({ id, title, description, isFavorite }) => (
    <View style={styles.item}>
      <Image
        style={styles.picture}
        source={require("./../../assets/images/hasaki.jpg")}
      />
      <View style={styles.info}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={() => toggleFavorite(id)}>
            <Ionicons
              name={isFavorite ? "heart-sharp" : "heart-outline"}
              size={20}
              color={Colors.PRIMARY}
            />
          </TouchableOpacity>
        </View>
        <StarRatingDisplay starSize={25} rating={4.5} />
        <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
          {description}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={serviceList}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            title={item.title}
            description={item.description}
            isFavorite={item.isFavorite}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F2F2F2",
    flex: 1,
  },
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
