import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert, Modal, TextInput } from "react-native";
import axios from "axios";
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from "./styles";
import { useNavigation } from '@react-navigation/native';
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../LocalIP/localIP';

const ServicesManager = () => {
    const navigation = useNavigation();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [newService, setNewService] = useState({ name: '', description: '', image: '', price: '', duration: '' });
    const router = useRouter();
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/services`);
                setServices(response.data.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchServices();
    }, []);

    const openModal = () => {
        setModalVisible(true);
        setNewService({ name: '', description: '', image: '', price: '', duration: '' });
    };

    const handleAddService = async () => {
        if (validateForm()) {
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await axios.post(`${API_BASE_URL}/services`, {
                    name: newService.name,
                    description: newService.description,
                    image: newService.image,
                    price: parseFloat(newService.price),
                    duration: parseInt(newService.duration)
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'ngrok-skip-browser-warning': '69420'
                    },
                });
                setServices([...services, response.data.data]);
                closeModal();
                Alert.alert("Success", "Service added successfully");
            } catch (error) {
                Alert.alert("Error", "Failed to add service");
            }
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!newService.name) errors.name = "Name is required.";
        if (!newService.description) errors.description = "Description is required.";
        if (!newService.price) errors.price = "Price is required.";
        if (!newService.image) errors.image = "Image is required.";
        if (!newService.duration) errors.duration = "Duration is required.";
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const closeModal = () => {
        setModalVisible(false);
        setValidationErrors({});
    };

    const handleViewDetail = async (service) => {
        try {
            await AsyncStorage.setItem('servicesId', service._id);
            router.push('/servicesdetail/servicesdetail');
        } catch (e) {
            console.log('Error storing service id', e);
        }
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
                    <Icon name='arrow-back' size={24} color="#ffffff" />
                </TouchableOpacity>
                <Text style={styles.title}>Service List</Text>
            </View>
            <TouchableOpacity onPress={openModal} style={styles.addButton}>
                <Icon name="add" size={30} color="#fff" />
            </TouchableOpacity>
            <FlatList
                data={services}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.supplierItem}>
                        <View style={styles.infoContainer}>
                            <View style={styles.row}>
                                <Text style={styles.label}>Name:</Text>
                                <Text style={styles.value}>{item.name}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Price:</Text>
                                <Text style={styles.value}>${item.price}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Duration:</Text>
                                <Text style={styles.value}>{item.duration} mins</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Description:</Text>
                                <Text style={styles.value}>{item.description}</Text>
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
                        <Text style={styles.modalTitle}>Add New Service</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            value={newService.name}
                            onChangeText={(text) => setNewService({ ...newService, name: text })}
                        />
                        {validationErrors.name && <Text style={styles.errorText}>{validationErrors.name}</Text>}
                        <TextInput
                            style={styles.input}
                            placeholder="Description"
                            value={newService.description}
                            onChangeText={(text) => setNewService({ ...newService, description: text })}
                        />
                        {validationErrors.description && <Text style={styles.errorText}>{validationErrors.description}</Text>}
                        <TextInput
                            style={styles.input}
                            placeholder="Image URL"
                            value={newService.image}
                            onChangeText={(text) => setNewService({ ...newService, image: text })}
                        />
                        {validationErrors.image && <Text style={styles.errorText}>{validationErrors.image}</Text>}
                        <TextInput
                            style={styles.input}
                            placeholder="Price"
                            keyboardType="numeric"
                            value={newService.price}
                            onChangeText={(text) => setNewService({ ...newService, price: text })}
                        />
                        {validationErrors.price && <Text style={styles.errorText}>{validationErrors.price}</Text>}
                        <TextInput
                            style={styles.input}
                            placeholder="Duration (minutes)"
                            keyboardType="numeric"
                            value={newService.duration}
                            onChangeText={(text) => setNewService({ ...newService, duration: text })}
                        />
                        {validationErrors.duration && <Text style={styles.errorText}>{validationErrors.duration}</Text>}
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={handleAddService} style={styles.saveButton}>
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

export default ServicesManager;
