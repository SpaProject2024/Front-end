import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import Navbar from "./navbar"; // Import Navbar component
import axios from "axios"; // Import axios for API calls
import { API_BASE_URL } from '../../LocalIP/localIP'; // API base URL

const MenuItems = () => {
  const [products, setProducts] = useState([]); // State to store products from API
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/product`);
        const fetchedProducts = response.data.data;
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#F4CE14" style={{ marginTop: 20 }} />;
  }

  return (
    <View style={menuStyles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={menuStyles.innerContainer}>
            <Image source={{ uri: item.image }} style={menuStyles.itemImage} />
            <View>
              <Text style={menuStyles.itemText}>{item.name}</Text>
              <Text style={menuStyles.itemText}>{item.price}</Text>
            </View>
          </View>
        )}
        ListHeaderComponent={<Navbar />}
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
    fontSize: 15,
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
});

export default MenuItems;
