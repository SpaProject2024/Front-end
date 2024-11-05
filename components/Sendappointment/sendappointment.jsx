import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, Image, TouchableOpacity, Modal, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../LocalIP/localIP';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from "expo-router";
import { styles } from "./styles";

export default function SendAppointment() {
    const router = useRouter();
    const [userData, setUserData] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [doctorID, setDoctorID] = useState(''); // ID của doctor
    const [managers, setManagers] = useState([]);
    const [selectedManager, setSelectedManager] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility

    const fetchManagers = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/user`);
            const managersList = response.data.data.filter(user => user.role === 'manager');
            setManagers(managersList); // Update state with filtered managers list
            console.log(managersList);
        } catch (error) {
            Alert.alert('Error', 'Could not get management list');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await AsyncStorage.getItem('userdata');
                if (user !== null) {
                    const parsedData = JSON.parse(user);
                    setUserData(parsedData.data);
                    setDoctorID(parsedData.data.doctorId);
                    console.log("Doctor ID", doctorID);
                }
            } catch (error) {
                console.error('Failed to load user data from AsyncStorage or API:', error);
            }
        };
        fetchData();
        fetchManagers(); // Fetch managers when component mounts
    }, []);

    const handleSubmit = async () => {
        if (title && description && selectedManager && doctorID) {
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await axios.post(`${API_BASE_URL}/sendappointment`, {
                    managerID: selectedManager._id, // Ensure to use the correct ID
                    doctorID,
                    content: description,
                    title,
                    datasent: new Date(),
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Use the token for authorization
                        'ngrok-skip-browser-warning': '69420'
                    },
                });

                console.log("Response:", response); // Log response from server

                if (response.status === 201) {
                    Alert.alert('Notification', 'Application submitted successfully!', [
                        {
                            text: 'OK',
                            onPress: () => {
                                // Reset the input fields
                                setTitle('');
                                setDescription('');
                                setSelectedManager(null);
                                setIsModalVisible(false); // Ensure modal is closed
                                // Navigate back to Appointment/appointment
                                router.push("/appointment/appointment");
                            }
                        }
                    ]);
                } else {
                    Alert.alert('Error', response.data.message);
                }
            } catch (error) {
                console.error("Error sending appointment:", error); // Log detailed error
                Alert.alert('Error', 'An error occurred while submitting the application');
            }
        } else {
            Alert.alert('Notice', 'Please fill in all information!');
        }
    };

    const renderManagerItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => {
                setSelectedManager(item); // Save selected manager's info
                setIsModalVisible(false); // Close modal
            }}>
                <Text style={styles.managerItem}>{item.email ? item.email : 'None email'}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push("/appointment/appointment")} style={styles.backButton}>
                    <Icon name='arrow-back' size={24} color="#b0b0b0" />
                </TouchableOpacity>
                <Text style={styles.title}>Resignation Letter</Text>
            </View>
            <View style={styles.sendcontent}>
                <TextInput
                    style={styles.input}
                    placeholder="ID Doctor"
                    value={doctorID}
                    onChangeText={setDoctorID}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Title"
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    style={styles.textArea}
                    placeholder="Describe the reason for leaving"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    numberOfLines={5}
                />
                <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                    <Text style={styles.selectedManager}>
                        {selectedManager ? selectedManager.email : 'Select management'}
                    </Text>
                </TouchableOpacity>

                {/* Modal to select manager */}
                <Modal visible={isModalVisible} transparent={true}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <FlatList
                                data={managers}
                                renderItem={renderManagerItem}
                                keyExtractor={item => item._id ? item._id.toString() : item.email}
                            />
                            <Button title="Đóng" onPress={() => setIsModalVisible(false)} />
                        </View>
                    </View>
                </Modal>

                <View style={styles.buttonContainer}>
                    <Button title="Submit application" onPress={handleSubmit} color="#4CAF50" />
                </View>
            </View>
        </ScrollView>
    );
}
