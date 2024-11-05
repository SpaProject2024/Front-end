import { View, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import ReviewItem from "./ReviewItem";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; // Import axios nếu chưa có
import { API_BASE_URL } from '../../LocalIP/localIP';

export default function ServiceReview({ service }) {
  const [serviceIds, setServiceIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/review`); // Đường dẫn tới API của bạn
        const allReviews = response.data.data; // Giả sử phản hồi chứa danh sách đánh giá
        setReviews(allReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    // fetchServiceIds();
    fetchReviews();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ paddingBottom: 240 }}>
      <FlatList
        style={{ padding: 20 }}
        data={reviews} // Sử dụng reviews đã lọc
        renderItem={({ item }) => <ReviewItem review={item} />}
      />
    </View>
  );
}
