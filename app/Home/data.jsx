import React from "react";
import { View, Text, StyleSheet, SectionList } from "react-native";

const menuItemsToDisplay = [
  {
    id: "0",
    title: "Acne treatment",
    data: [
      { id: "0", name: "Hummus", price: "$5.00" },
      { id: "1", name: "Moutabal", price: "$5.00" },
      { id: "2", name: "Falafel", price: "$7.50" },
      { id: "3", name: "Marinated Olives", price: "$5.00" },
      { id: "4", name: "Kofta", price: "$5.00" },
      { id: "5", name: "Eggplant Salad", price: "$8.50" },
    ],
  },
  {
    id: "1",
    title: "Scar treatment ",
    data: [
      { id: "6", name: "Lentil Burger", price: "$10.00" },
      { id: "7", name: "Smoked Salmon", price: "$14.00" },
      { id: "8", name: "Kofta Burger", price: "$11.00" },
      { id: "9", name: "Turkish Kebab", price: "$15.50" },
    ],
  },
  {
    id: "2",
    title: "Nursing spa",
    data: [
      { id: "10", name: "Fries", price: "$3.00" },
      { id: "11", name: "Buttered Rice", price: "$3.00" },
      { id: "12", name: "Bread Sticks", price: "$3.00" },
      { id: "13", name: "Pita Pocket", price: "$3.00" },
      { id: "14", name: "Lentil Soup", price: "$3.75" },
      { id: "15", name: "Greek Salad", price: "$6.00" },
      { id: "16", name: "Rice Pilaf", price: "$4.00" },
    ],
  },
  {
    id: "3",
    title: "Favors / Gifts",
    data: [
      { id: "17", name: "Baklava", price: "$3.00" },
      { id: "18", name: "Tartufo", price: "$3.00" },
      { id: "19", name: "Tiramisu", price: "$5.00" },
      { id: "20", name: "Panna Cotta", price: "$5.00" },
    ],
  },
];

const Item = ({ name, price }) => (
  <View style={menuStyles.innerContainer}>
    <Text style={menuStyles.itemText}>{name}</Text>
    <Text style={menuStyles.itemText}>{price}</Text>
  </View>
);

const MenuItems = () => {
  const renderItem = ({ item }) => <Item name={item.name} price={item.price} />;

  return (
    <View style={menuStyles.container}>
      <SectionList
        sections={menuItemsToDisplay}
        renderItem={renderItem}
        renderSectionHeader={({ section }) => (
          <Text style={menuStyles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const menuStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    paddingHorizontal: 40,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemText: {
    color: "#F4CE14",
    fontSize: 20,
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#F4CE14",
    padding: 10,
    textAlign: "center",
  },
});

export default MenuItems;
