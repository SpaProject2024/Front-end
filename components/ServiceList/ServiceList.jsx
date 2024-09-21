import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import ServiceItem from "./ServiceItem";

const serviceList = [
  {
    id: "1",
    title: "First Item",
    image: "./../../assets/images/hasaki.jpg",
    type: "A",
    description:
      "A performant interface for rendering basic, flat lists, supporting the most handy feature. A performant interface for rendering basic, flat lists, supporting the most handy feature",
    isFavorite: true,
    rate: 3,
  },
  {
    id: "2",
    title: "Second Item",
    image: "./../../assets/images/hasaki.jpg",
    type: "B",
    description:
      "A performant interface for rendering basic, flat lists, supporting the most handy feature. A performant interface for rendering basic, flat lists, supporting the most handy feature",
    isFavorite: false,
    rate: 5,
  },
  {
    id: "3",
    title: "Third Item",
    image: "./../../assets/images/hasaki.jpg",
    type: "C",
    description:
      "A performant interface for rendering basic, flat lists, supporting the most handy feature. A performant interface for rendering basic, flat lists, supporting the most handy feature",
    isFavorite: true,
    rate: 4,
  },
  {
    id: "4",
    title: "First Item",
    image: "./../../assets/images/hasaki.jpg",
    type: "A",
    description:
      "A performant interface for rendering basic, flat lists, supporting the most handy feature. A performant interface for rendering basic, flat lists, supporting the most handy feature",
    isFavorite: false,
    rate: 3,
  },
  {
    id: "5",
    title: "Second Item",
    image: "./../../assets/images/hasaki.jpg",
    type: "B",
    description:
      "A performant interface for rendering basic, flat lists, supporting the most handy feature. A performant interface for rendering basic, flat lists, supporting the most handy feature",
    isFavorite: false,
    rate: 2,
  },
  {
    id: "6",
    title: "Third Item",
    image: "./../../assets/images/hasaki.jpg",
    type: "C",
    description:
      "A performant interface for rendering basic, flat lists, supporting the most handy feature. A performant interface for rendering basic, flat lists, supporting the most handy feature",
    isFavorite: false,
    rate: 1,
  },
  {
    id: "7",
    title: "First Item",
    image: "./../../assets/images/hasaki.jpg",
    type: "A",
    description:
      "A performant interface for rendering basic, flat lists, supporting the most handy feature. A performant interface for rendering basic, flat lists, supporting the most handy feature",
    isFavorite: false,
    rate: 5,
  },
  {
    id: "8",
    title: "Second Item",
    image: "./../../assets/images/hasaki.jpg",
    type: "B",
    description:
      "A performant interface for rendering basic, flat lists, supporting the most handy feature. A performant interface for rendering basic, flat lists, supporting the most handy feature",
    isFavorite: false,
    rate: 4,
  },
  {
    id: "9",
    title: "Third Item",
    image: "./../../assets/images/hasaki.jpg",
    type: "C",
    description:
      "A performant interface for rendering basic, flat lists, supporting the most handy feature. A performant interface for rendering basic, flat lists, supporting the most handy feature",
    isFavorite: false,
    rate: 3,
  },
  {
    id: "10",
    title: "Third Item",
    image: "./../../assets/images/hasaki.jpg",
    type: "C",
    description:
      "A performant interface for rendering basic, flat lists, supporting the most handy feature. A performant interface for rendering basic, flat lists, supporting the most handy feature",
    isFavorite: false,
    rate: 2,
  },
];

const initialServiceList = serviceList;

export default function ServiceList() {
  const [serviceList, setServiceList] = useState(initialServiceList);
  const toggleFavorite = (id) => {
    setServiceList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };
  const router = useRouter();

  return (
    <View style={styles.container}>
      <FlatList
        data={serviceList}
        renderItem={({ item }) => (
          <ServiceItem
            service={item}
            toggleFavorite={() => toggleFavorite(item.id)} // Bao trong hàm
            onServicePress={() =>
              router.push(
                "/ServiceInfo/" + encodeURIComponent(JSON.stringify(item))
              )
            }
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
  info: {
    padding: 10,
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