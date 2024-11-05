import { View, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "expo-router";
import ServiceItem from "./ServiceItem";
import SearchService from "./SearchService";  // Make sure this path is correct
import { API_BASE_URL } from '../../LocalIP/localIP';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ServiceList() {
  const [serviceList, setServiceList] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);  // For displaying search results
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/services`);
        const services = response.data.data;

        await AsyncStorage.setItem('serviceId', JSON.stringify(services.map(service => service._id)));

        const servicesWithRatings = await Promise.all(
          services.map(async (service) => {
            try {
              const ratingResponse = await axios.get(`${API_BASE_URL}/review/average/${service._id}`);
              const averageRating = parseFloat(ratingResponse.data.averageRating) || 0;
              return { ...service, rate: averageRating, averageRating };
            } catch (error) {
              // console.error(`Error fetching rating for service ${service._id}:`, error);
              return { ...service, rate: 0, averageRating: 0 };
            }
          })
        );

        setServiceList(servicesWithRatings);
        setFilteredServices(servicesWithRatings);  // Initially display all services
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Define handleSearch function
  const handleSearch = (query) => {
    if (query) {
      const filteredData = serviceList.filter((service) =>
        service.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredServices(filteredData);
    } else {
      setFilteredServices(serviceList);
    }
  };

  const toggleFavorite = (id) => {
    setServiceList((prevList) =>
      prevList.map((item) =>
        item._id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Fixed height for the search bar */}
      <View style={styles.searchContainer}>
        <SearchService placeholder="Search Services..." onSearch={handleSearch} />
      </View>
      <FlatList
        data={filteredServices}  // Use filtered data for display
        renderItem={({ item }) => (
          <ServiceItem
            service={item}
            toggleFavorite={() => toggleFavorite(item._id)}
            onServicePress={() =>
              router.push(
                "/ServiceInfo/" + encodeURIComponent(JSON.stringify(item))
              )
            }
          />
        )}
        keyExtractor={(item) => item._id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F2F2F2",
    flex: 1,
  },
  searchContainer: {
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 10, // Optional: Padding for aesthetics
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    paddingBottom: 20, // Optional: Add some padding at the bottom
  },
});
