import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SectionList,
  ActivityIndicator,
} from "react-native";

// Dữ liệu menu gốc
const notificationToDisplay = [
  {
    id: "0",
    title: "Notification",
    data: [
      {
        id: "0",
        status: "New appoiltment",
        content:
          "Booked an your appointment 21 June 2022 at lee nails and makeover",
      },
      {
        id: "1",
        status: "New appoiltment",
        content:
          "Booked an your appointment 21 June 2022 at lee nails and makeover",
      },
      {
        id: "2",
        status: "New appoiltment",
        content:
          "Booked an your appointment 21 June 2022 at lee nails and makeover",
      },
      {
        id: "3",
        status: "New appoiltment",
        content:
          "Booked an your appointment 21 June 2022 at lee nails and makeover",
      },
      {
        id: "4",
        status: "New appoiltment",
        content:
          "Booked an your appointment 21 June 2022 at lee nails and makeover",
      },
      {
        id: "5",
        status: "New appoiltment",
        content:
          "Booked an your appointment 21 June 2022 at lee nails and makeover",
      },
      {
        id: "6",
        status: "New appoiltment",
        content:
          "Booked an your appointment 21 June 2022 at lee nails and makeover",
      },
      {
        id: "7",
        status: "New appoiltment",
        content:
          "Booked an your appointment 21 June 2022 at lee nails and makeover",
      },
      // More items
    ],
  },
  // More sections
];

const Item = ({ status, content }) => (
  <View style={menuStyles.innerContainer}>
    <View>
      <Text style={menuStyles.statusText}>{status}</Text>
      <Text style={menuStyles.contentText}>{content}</Text>
    </View>
  </View>
);

const MenuItems = () => {
  const [visibleItems, setVisibleItems] = useState(
    notificationToDisplay.map((section) => ({
      ...section,
      data: section.data.slice(0, 6),
    }))
  );
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreItems = () => {
    if (!hasMore) return;
    setLoading(true);
    setTimeout(() => {
      let moreDataAvailable = false;
      const updatedItems = visibleItems.map((section, index) => {
        const originalSection = notificationToDisplay[index];
        const currentLength = section.data.length;
        const moreItems = originalSection.data.slice(
          currentLength,
          currentLength + 6
        );
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

  const renderItem = ({ item }) => (
    <Item status={item.status} content={item.content} />
  );

  const renderFooter = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#F4CE14" />;
    } else if (!hasMore) {
      return (
        <Text style={menuStyles.noMoreText}>
          There are no more notifications to display.
        </Text>
      );
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
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    color: "#000",
    fontSize: 20,
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  sectionHeader: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: "#2B5F2F",
    padding: 10,
    textAlign: "center",
  },
  noMoreText: {
    textAlign: "center",
    padding: 20,
    fontSize: 16,
    color: "#888",
  },
  statusText: {
    color: "#2B5F2F",
    fontSize: 16,
    fontWeight: "bold",
  },
  contentText: {
    color: "#333",
    marginTop: 5,
    fontSize: 16,
  },
});

export default MenuItems;
