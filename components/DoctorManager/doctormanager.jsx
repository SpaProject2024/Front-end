import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert, Modal, TextInput, Image } from "react-native";
import axios from "axios";
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from "./styles";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from '@react-navigation/native';
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../LocalIP/localIP';

const DoctorManager = () => {
    const navigation = useNavigation();
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [newDoctor, setNewDoctor] = useState({ email: '', password: '', role: '' });
    const router = useRouter();
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/doctor`);
                setDoctors(response.data.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    const openModal = () => {
        setModalVisible(true);
        setNewDoctor({ email: '', password: '', role: '' });
    };

    const handleAddDoctor = async () => {
        if (validateForm()) {
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await axios.post(`${API_BASE_URL}/doctor/create`, {
                    email: newDoctor.email,
                    password: newDoctor.password,
                    role: newDoctor.role,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'ngrok-skip-browser-warning': '69420'
                    },
                });
                setDoctors([...doctors, response.data.data]);
                closeModal();
                Alert.alert("Success", "Doctor added successfully");
            } catch (error) {
                Alert.alert("Error", "Failed to add doctor");
            }
        }
    };

    const handleViewDetail = async (doctor) => {
        try {
            await AsyncStorage.setItem('doctormanagerId', doctor.doctorId._id);
            router.push('/doctormanagerdetail/doctormanagerdetail');
        } catch (e) {
            console.log('Error storing doctor id', e);
        }
    };

    const validateForm = () => {
        const errors = {};

        if (!newDoctor.email) {
            errors.email = "Email is required.";
        }
        if (!newDoctor.password) {
            errors.password = "Password is required.";
        }
        if (!newDoctor.role) {
            errors.role = "Role is required.";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const closeModal = () => {
        setModalVisible(false);
        setValidationErrors({});
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    const goBack = () => {
        router.push('/Dashboard/dashboard');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={goBack} style={styles.backButton}>
                    <Icon name='arrow-back' size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.title}>Doctor List</Text>
            </View>
            <TouchableOpacity onPress={openModal} style={styles.addButton}>
                <Icon name="add" size={30} color="#fff" />
            </TouchableOpacity>
            <FlatList
                data={doctors}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.supplierItem}>
                        <View style={styles.infoContainer}>
                            <Image source={{ uri: item.avatar }} style={styles.avatar} />
                            <View style={styles.row}>
                                <Text style={styles.label}>Email:</Text>
                                <Text style={styles.value}>{item.email}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Name:</Text>
                                <Text style={styles.value}>{item.doctorId.fullName}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Phone:</Text>
                                <Text style={styles.value}>{item.doctorId.numberPhone}</Text>
                            </View>
                            <TouchableOpacity onPress={() => handleViewDetail(item)} style={styles.viewButton}>
                                <Text style={styles.buttonText}>View</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Add New Doctor</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={newDoctor.email}
                            onChangeText={(text) => setNewDoctor({ ...newDoctor, email: text })}
                        />
                        {validationErrors.email && <Text style={styles.errorText}>{validationErrors.email}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={newDoctor.password}
                            onChangeText={(text) => setNewDoctor({ ...newDoctor, password: text })}
                        />
                        {validationErrors.password && <Text style={styles.errorText}>{validationErrors.password}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Role"
                            value={newDoctor.role}
                            onChangeText={(text) => setNewDoctor({ ...newDoctor, role: text })}
                        />
                        {validationErrors.role && <Text style={styles.errorText}>{validationErrors.role}</Text>}

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={handleAddDoctor} style={styles.saveButton}>
                                <Text style={styles.saveButtonText}>Add</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={closeModal} style={styles.cancelButton}>
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default DoctorManager;
