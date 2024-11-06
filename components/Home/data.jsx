import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ScrollView, ActivityIndicator, Button } from "react-native";
import Navbar from "./navbar"; // Import Navbar component
import axios from "axios"; // Import axios for API calls
import { API_BASE_URL } from '../../LocalIP/localIP'; // API base URL

const MenuItems = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/product`);
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleProductSelect = async (productId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/product/${productId}`);
      setSelectedProduct(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#F4CE14"
        style={styles.loadingIndicator}
      />
    );
  }

  if (selectedProduct) {
    return (
      <ScrollView>
        <View style={styles.detailsContainer}>
          <Image
            source={{ uri: selectedProduct.data.image }}
            style={styles.detailsImage}
          />
          <Text style={styles.detailsName}>{selectedProduct.data.name}</Text>
          <View style={styles.detailsPriceContainer}>
            <Text style={styles.detailsPrice}>
              ${selectedProduct.data.price}
            </Text>
          </View>
          <Text style={styles.detailsDescription}>
            {selectedProduct.data.description}
          </Text>
          <Button
            title="Back to Products"
            onPress={() => setSelectedProduct(null)}
          />
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleProductSelect(item._id)}>
            <View style={styles.innerContainer}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.textContainer}>
                <Text
                  style={styles.itemText}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.name}
                </Text>
              </View>
              <View style={styles.priceContainer}>
                <Text
                  style={styles.itemPrice}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  ${item.price}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListHeaderComponent={<Navbar />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  textContainer: {
    flex: 2,
    alignItems: "center",
  },
  priceContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  itemText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
  itemPrice: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 14,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },

  // Styles for details view
  detailsContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF",
    alignItems: "center",
  },
  detailsImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
  },
  detailsName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  detailsPriceContainer: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  detailsPrice: {
    fontSize: 20,
    color: "#F4CE14",
    fontWeight: "bold",
  },
  detailsDescription: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginVertical: 10,
  },
});

export default MenuItems;