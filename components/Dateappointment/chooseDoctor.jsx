import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from "expo-router";
import { useNavigation } from '@react-navigation/native';
import { API_BASE_URL } from '../../LocalIP/localIP';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ChooseDoctor() {
    const router = useRouter();
    const navigation = useNavigation();
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [appointmentDate, setAppointmentDate] = useState(null);
    const [selectedServiceId, setSelectedServiceId] = useState(null);
    const [userId, setUserId] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const serviceId = await AsyncStorage.getItem("selectedServiceId");
                const userId = await AsyncStorage.getItem("userId");
                const date = await AsyncStorage.getItem("selectedDate");
                const slot = await AsyncStorage.getItem("selectedSlot");
                setSelectedServiceId(serviceId);
                setUserId(userId);
                setAppointmentDate(date);
                setSelectedSlot(slot);
                const response = await axios.get(`${API_BASE_URL}/doctor`);
                setDoctors(response.data.data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    const handleSelect = (id) => {
        setSelectedDoctor(id);
    };
    const goBack = () => {
        navigation.goBack();
    };
    const handleContinue = async () => {
        try {
            console.log("Selected Doctor:", selectedDoctor);
            console.log("User ID:", userId);
            console.log("Appointment Date:", appointmentDate);
            console.log("Selected Slot:", selectedSlot);
            console.log("Selected Service ID:", selectedServiceId);
            const appointmentData = {
                appointmentDate: appointmentDate,
                slot: selectedSlot,
                status: "Pending",
                services: [selectedServiceId],
                doctor: selectedDoctor,
                user: userId,
            };
            console.log("Appointment Data:", appointmentData); // Debugging line

            const token = await AsyncStorage.getItem('token');
            const response = await axios.post(`${API_BASE_URL}/appointments`, appointmentData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Use the token for authorization
                    'ngrok-skip-browser-warning': '69420'
                },
            });
            if (response.status === 201 || response.status === 200) {
                const appointmentId = response.data.data._id; // Assuming response contains appointment ID

                // Step 3: Fetch all Staff IDs
                const staffResponse = await axios.get(`${API_BASE_URL}/staff`);
                const staffIds = staffResponse.data.data.map(staff => staff._id);
                // Step 4: Create notifications for each staff member
                await Promise.all(staffIds.map(async (staffId) => {
                    try {
                        const notificationData = {
                            content: appointmentId,
                            notification_type: "Appointment",
                            receiverID: staffId,
                            senderID: userId,
                            title: "New Appointment Scheduled",
                        };
                        await axios.post(`${API_BASE_URL}/notification`, notificationData);
                    } catch (notificationError) {
                        console.error(`Error creating notification for staff ID ${staffId}:`, notificationError);
                    }
                }));
                Alert.alert("Success", "Appointment created successfully!", [
                    {
                        text: "OK",
                        onPress: () => router.push("History/history"), // Navigate to appointment history
                    },
                ]);
            }
        } catch (error) {
            console.error('Error creating appointment:', error);
            Alert.alert("Error", "Failed to create appointment.");
        }
    };

    const renderDoctor = ({ item }) => (
        <TouchableOpacity style={styles.employeeContainer} onPress={() => handleSelect(item._id)}>
            <Image
                style={styles.image}
                source={{
                    uri: item.doctorId.avatar ||
                        "https://imgcdn.stablediffusionweb.com/2024/5/20/e4b6d281-aa03-4d46-b322-0f32374bc98b.jpg",
                }}
            />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.doctorId.fullName}</Text>
            </View>
            <View style={styles.radioContainer}>
                <View style={[styles.radioOuter, selectedDoctor === item._id && styles.radioOuterSelected]}>
                    {selectedDoctor === item._id && <View style={styles.radioInner} />}
                </View>
            </View>
        </TouchableOpacity>
    );



    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#ff3366" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={goBack} style={styles.backButton}>
                    <Icon name='arrow-back' size={24} color="#b0b0b0" />
                </TouchableOpacity>
                <Text style={styles.title}>Schedule</Text>
            </View>
            <FlatList
                style={styles.card}
                data={doctors}
                renderItem={renderDoctor}
                keyExtractor={(item) => item._id}
            />

            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                <Text style={styles.continueText}>CONTINUE</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    title: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 50,
    },
    image: {
        borderRadius: 50,
        width: 80,
        height: 80,
        marginRight: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 10,
        paddingHorizontal: 20,
        backgroundColor: '#5C9161',
    },
    backButton: {
        marginRight: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        padding: 20,
    },
    employeeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    radioContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ff3366',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioOuterSelected: {
        borderColor: '#ff3366',
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#ff3366',
    },
    continueButton: {
        backgroundColor: '#ff3366',
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginVertical: 20,
    },
    continueText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
