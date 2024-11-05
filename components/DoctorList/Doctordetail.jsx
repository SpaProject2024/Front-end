
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from "axios";
import { API_BASE_URL } from "../../LocalIP/localIP";

export default function DoctorDetail() {
    const navigation = useNavigation();
    const route = useRoute();
    const { doctorId } = route.params;
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
console.log("tvbg",doctorId)
    // Fetch thông tin bác sĩ từ API
    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/doctor/${doctorId}`);
                setDoctor(response.data.data); // Giả định rằng API trả về thông tin bác sĩ trong data
            } catch (err) {
                setError("Error fetching doctor details.");
                console.error("Error fetching doctor details:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctor();
    }, [doctorId]);

    const goBack = () => {
        navigation.goBack();
    };
    // Hiển thị khi đang loading
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading doctor details...</Text>
            </View>
        );
    }

    // Hiển thị nếu có lỗi xảy ra
    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text>{error}</Text>
            </View>
        );
    }

    // Hiển thị nếu không tìm thấy thông tin bác sĩ
    if (!doctor) {
        return (
            <View style={styles.errorContainer}>
                <Text>No doctor details found.</Text>
            </View>
        );
    }

    // Hiển thị thông tin chi tiết của bác sĩ
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={goBack} style={styles.backButton}>
                    <Icon name='arrow-back' size={24} color="#b0b0b0" />
                </TouchableOpacity>
                <Text style={styles.title}>Doctor Detail</Text>
            </View>
            <View style={styles.card}>
                <Image
                    style={styles.image}
                    source={{
                        uri: doctor.avatar || "https://imgcdn.stablediffusionweb.com/2024/5/20/e4b6d281-aa03-4d46-b322-0f32374bc98b.jpg",
                    }}
                />
                <Text style={styles.name}>{doctor.fullName}</Text>
                <Text style={styles.detail}>Phone: 0{doctor.numberPhone}</Text>
                <Text style={styles.detail}>Birthday: {doctor.birthday ? new Date(doctor.birthday).toLocaleDateString() : "N/A"}</Text>
                <Text style={styles.detail}>Experience: {doctor.experience} years</Text>
                <Text style={styles.detail}>Address: {doctor.address || "N/A"}</Text>
                <Text style={styles.detail}>Description: {doctor.description}</Text>
                <Text style={styles.detail}>Working Time: {doctor.workingtime} hours/week</Text>
            </View>
        </View>
    );
}

// Định dạng kiểu cho UI
// Định dạng kiểu cho UI
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9', // Nền sáng hơn
    },
    image: {
        borderRadius: 50,
        width: 100,
        height: 100,
        marginLeft: 50,
        marginBottom: 20,
        borderWidth: 2, // Thêm viền cho ảnh
        borderColor: '#5C9161', // Màu viền phù hợp
    },
    card: {
        padding: 20,
        margin: 20,
        paddingLeft: 50,
        backgroundColor: '#ffffff', // Màu nền của thẻ
        borderRadius: 10, // Bo góc cho thẻ
        shadowColor: '#000', // Bóng đổ
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5, // Độ nổi cho Android
        alignItems: "flex-start",
    },
    name: {
        fontWeight: "bold",
        fontSize: 26,
        marginBottom: 10,
        color: '#333', // Màu chữ tối hơn
    },
    detail: {
        fontSize: 16,
        marginBottom: 20,
        marginVertical: 5,
        color: '#555', // Màu chữ nhạt hơn
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#f9f9f9',
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#f9f9f9',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 10,
        paddingHorizontal: 20, // Padding bên
        backgroundColor: '#5C9161',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    backButton: {
        marginRight: 20,
    },
    title: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});
