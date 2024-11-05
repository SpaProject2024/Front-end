import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Button, Modal, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../LocalIP/localIP';
import { styles } from "./styles"; // Ensure your styles are defined appropriately
import Icon from 'react-native-vector-icons/Ionicons'; // Import icons
import { useRouter } from "expo-router";

const ServicesDetail = () => {
    const router = useRouter();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false); // Modal to confirm deletion
    const [updatedService, setUpdatedService] = useState({ name: '', description: '', image: '', price: '', duration: '' });
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        const fetchServiceDetail = async () => {
            try {
                const serviceId = await AsyncStorage.getItem('servicesId');
                if (serviceId) {
                    const response = await axios.get(`${API_BASE_URL}/services/${serviceId}`);
                    setService(response.data.data);
                }
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchServiceDetail();
    }, []);

    const handleUpdate = async () => {
        if (validateForm()) {
            try {
                const token = await AsyncStorage.getItem('token');
                const serviceId = await AsyncStorage.getItem('servicesId');
                if (serviceId) {
                    await axios.put(`${API_BASE_URL}/services/${serviceId}`, updatedService,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`, // Use the token for authorization
                                'ngrok-skip-browser-warning': '69420'
                            },
                        }
                    );
                    setService(updatedService);
                    setModalVisible(false); // Close modal after update
                }
            } catch (error) {
                setError(error.message);
            }
        }
    };

    const handleDelete = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const serviceId = await AsyncStorage.getItem('servicesId');
            if (serviceId) {
                // Delete service
                await axios.delete(`${API_BASE_URL}/services/${serviceId}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`, // Use the token for authorization
                            'ngrok-skip-browser-warning': '69420'
                        },
                    }
                );
                setService(null); // Remove service from UI after successful deletion
                router.push('/servicesmanager/servicesmanager'); // Go back to services list
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!updatedService.name) {
            errors.name = "Name is required.";
        }
        if (!updatedService.description) {
            errors.description = "Description is required.";
        }
        if (!updatedService.image) {
            errors.image = "Image URL is required.";
        }
        if (!updatedService.price) {
            errors.price = "Price is required.";
        }
        if (!updatedService.duration) {
            errors.duration = "Duration is required.";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    const goBack = () => {
        router.push('/servicesmanager/servicesmanager');
    };

    return (
        <ScrollView style={styles.container}>
            {service ? (
                <>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={goBack} style={styles.backButton}>
                            <Icon name='arrow-back' size={24} color="#fff" />
                        </TouchableOpacity>
                        <Text style={styles.title}>Service Detail</Text>
                    </View>
                    <View style={styles.card}>
                        <Image source={{ uri: service.image }} style={styles.serviceImage} />
                        <Text style={styles.titlename}>{service.name}</Text>
                        <Text style={styles.detailText}>Price: ${service.price}</Text>
                        <Text style={styles.detailText}>Duration: {service.duration} minutes</Text>
                        <Text style={styles.detailText}>Description: {service.description}</Text>
                        {/* Update and Delete Buttons */}
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => {
                                setModalVisible(true);
                                setUpdatedService({
                                    name: service.name,
                                    description: service.description,
                                    image: service.image,
                                    price: service.price,
                                    duration: service.duration
                                });
                            }}>
                                <Icon name="pencil" size={30} color="green" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setConfirmDeleteVisible(true)}>
                                <Icon name="trash" size={30} color="red" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Update Modal */}
                    <Modal visible={modalVisible} animationType="slide" transparent={true}>
                        <View style={styles.modalBackground}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalTitle}>Update Service</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Name"
                                    value={updatedService.name}
                                    onChangeText={(text) => setUpdatedService({ ...updatedService, name: text })}
                                />
                                {validationErrors.name && <Text style={styles.errorText}>{validationErrors.name}</Text>}

                                <TextInput
                                    style={styles.input}
                                    placeholder="Description"
                                    value={updatedService.description}
                                    onChangeText={(text) => setUpdatedService({ ...updatedService, description: text })}
                                />
                                {validationErrors.description && <Text style={styles.errorText}>{validationErrors.description}</Text>}

                                <TextInput
                                    style={styles.input}
                                    placeholder="Image URL"
                                    value={updatedService.image}
                                    onChangeText={(text) => setUpdatedService({ ...updatedService, image: text })}
                                />
                                {validationErrors.image && <Text style={styles.errorText}>{validationErrors.image}</Text>}

                                <TextInput
                                    style={styles.input}
                                    placeholder="Price"
                                    value={String(updatedService.price)}
                                    keyboardType="numeric"
                                    onChangeText={(text) => setUpdatedService({ ...updatedService, price: Number(text) })}
                                />
                                {validationErrors.price && <Text style={styles.errorText}>{validationErrors.price}</Text>}

                                <TextInput
                                    style={styles.input}
                                    placeholder="Duration (minutes)"
                                    value={String(updatedService.duration)}
                                    keyboardType="numeric"
                                    onChangeText={(text) => setUpdatedService({ ...updatedService, duration: Number(text) })}
                                />
                                {validationErrors.duration && <Text style={styles.errorText}>{validationErrors.duration}</Text>}

                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
                                        <Text style={styles.saveButtonText}>Save</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.cancelButton}
                                        onPress={() => {
                                            setModalVisible(false);
                                            setValidationErrors({}); // Reset errors on cancel
                                        }}>
                                        <Text style={styles.cancelButtonText}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    {/* Confirm Delete Modal */}
                    <Modal visible={confirmDeleteVisible} animationType="slide" transparent={true}>
                        <View style={styles.modalBackground}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalTitle}>Confirm Delete</Text>
                                <Text>Are you sure you want to delete this service?</Text>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={styles.saveButton} onPress={handleDelete}>
                                        <Text style={styles.saveButtonText}>Delete</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.cancelButton} onPress={() => setConfirmDeleteVisible(false)}>
                                        <Text style={styles.cancelButtonText}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </>
            ) : (
                <Text>No service available</Text>
            )}
        </ScrollView>
    );
};

export default ServicesDetail;
