import React, { useState } from "react";
import { View, Text, Image, StyleSheet, SectionList, ActivityIndicator } from "react-native";
import Navbar from "./navbar"; // Import the Navbar component

// Dữ liệu menu gốc
const menuItemsToDisplay = [
  {
    id: "0",
    title: "Acne treatment",
    data: [
      { id: "0", name: "Hummus", price: "$5.00", image: require('../../assets/images/cosmetic.png') },
      { id: "1", name: "Moutabal", price: "$5.00", image: require('../../assets/images/cosmetic.png') },
      { id: "2", name: "Falafel", price: "$7.50", image: require('../../assets/images/cosmetic.png') },
      { id: "3", name: "Marinated Olives", price: "$5.00", image: require('../../assets/images/cosmetic.png') },
      { id: "4", name: "Kofta", price: "$5.00", image: require('../../assets/images/cosmetic.png') },
      { id: "5", name: "Eggplant Salad", price: "$8.50", image: require('../../assets/images/cosmetic.png') },
      { id: "6", name: "Extra Item 1", price: "$5.50", image: require('../../assets/images/cosmetic.png') },
      { id: "7", name: "Extra Item 2", price: "$5.50", image: require('../../assets/images/cosmetic.png') },
      // More items
    ],
  },
  // More sections
];

const Item = ({ name, price, image }) => (
  <View style={menuStyles.innerContainer}>
    <Image source={image} style={menuStyles.itemImage} />
    <View>
      <Text style={menuStyles.itemText}>{name}</Text>
      <Text style={menuStyles.itemText}>{price}</Text>
    </View>
  </View>
);

const MenuItems = () => {
  const [visibleItems, setVisibleItems] = useState(menuItemsToDisplay.map(section => ({
    ...section,
    data: section.data.slice(0, 6),
  })));
  const [loading, setLoading] = useState(false); 
  const [hasMore, setHasMore] = useState(true); 

  const loadMoreItems = () => {
    if (!hasMore) return; 
    setLoading(true);
    setTimeout(() => {
      let moreDataAvailable = false; 
      const updatedItems = visibleItems.map((section, index) => {
        const originalSection = menuItemsToDisplay[index];
        const currentLength = section.data.length;
        const moreItems = originalSection.data.slice(currentLength, currentLength + 6);
        if (moreItems.length > 0) moreDataAvailable = true;
        return {
          ...section,
          data: [...section.data, ...moreItems],
        };
      });
      setVisibleItems(updatedItems);
      setHasMore(moreDataAvailable); 
      setLoading(false); 
    }, 1000); 
  };

  const renderItem = ({ item }) => <Item name={item.name} price={item.price} image={item.image} />;

  const renderFooter = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#F4CE14" />;
    } else if (!hasMore) {
      return <Text style={menuStyles.noMoreText}>There are no more products to display.</Text>;
    }
    return null;
  };

  return (
    <View style={menuStyles.container}>
      <SectionList
        sections={visibleItems}
        renderItem={renderItem}
        renderSectionHeader={({ section }) => (
          <Text style={menuStyles.sectionHeader}>{section.title}</Text>
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Navbar />}
        onEndReached={hasMore ? loadMoreItems : null} 
        onEndReachedThreshold={0.5} 
        ListFooterComponent={renderFooter()}
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
    alignItems: "center",
  },
  itemText: {
    color: "#F4CE14",
    fontSize: 20,
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#F4CE14",
    padding: 10,
    textAlign: "center",
  },
  noMoreText: {
    textAlign: "center",
    padding: 20,
    fontSize: 16,
    color: "#888",
  },
});

export default MenuItems;