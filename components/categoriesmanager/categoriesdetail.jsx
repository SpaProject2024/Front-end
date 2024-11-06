import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Button, Modal, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../LocalIP/localIP';
import { styles } from "./styles"; // Ensure your styles are defined appropriately
import Icon from 'react-native-vector-icons/Ionicons'; // Import icons
import { useRouter } from "expo-router";

const CategoriesDetail = () => {
    const router = useRouter();
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false); // Modal to confirm deletion
    const [updatedCategory, setUpdatedCategory] = useState({ name: '', description: '' });
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        const fetchCategoryDetail = async () => {
            try {
                const categoryId = await AsyncStorage.getItem('categoriesId');
                if (categoryId) {
                    const response = await axios.get(`${API_BASE_URL}/categories/${categoryId}`);
                    setCategory(response.data.data);
                }
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchCategoryDetail();
    }, []);

    const handleUpdate = async () => {
        if (validateForm()) {
            try {
                const token = await AsyncStorage.getItem('token');
                const categoryId = await AsyncStorage.getItem('categoriesId');
                if (categoryId) {
                    await axios.put(`${API_BASE_URL}/categories/${categoryId}`, updatedCategory,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`, // Use the token for authorization
                                'ngrok-skip-browser-warning': '69420'
                            },
                        }
                    );
                    setCategory(updatedCategory);
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
            const categoryId = await AsyncStorage.getItem('categoriesId');
            if (categoryId) {
                // Delete category
                await axios.delete(`${API_BASE_URL}/categories/${categoryId}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`, // Use the token for authorization
                            'ngrok-skip-browser-warning': '69420'
                        },
                    }
                );
                setCategory(null); // Remove category from UI after successful deletion
                router.push('/categoriesmanager/categoriesmanager'); // Go back to categories list
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!updatedCategory.name) {
            errors.name = "Name is required.";
        }

        if (!updatedCategory.description) {
            errors.description = "Description is required.";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }
    return (
        <View style={styles.container}>
            {category ? (
                <>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                            <Icon name='arrow-back' size={24} color="#ffffff" />
                        </TouchableOpacity>
                        <Text style={styles.title}>Category Detail</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.titlename}>{category.name}</Text>
                        <Text style={styles.detailText}>Description: {category.description}</Text>

                        {/* Update and Delete Buttons */}
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => {
                                setModalVisible(true);
                                setUpdatedCategory({
                                    name: category.name,
                                    description: category.description
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
                                <Text style={styles.modalTitle}>Update Category</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Name"
                                    value={updatedCategory.name}
                                    onChangeText={(text) => setUpdatedCategory({ ...updatedCategory, name: text })}
                                />
                                {validationErrors.name && <Text style={styles.errorText}>{validationErrors.name}</Text>}

                                <TextInput
                                    style={styles.input}
                                    placeholder="Description"
                                    value={updatedCategory.description}
                                    onChangeText={(text) => setUpdatedCategory({ ...updatedCategory, description: text })}
                                />
                                {validationErrors.description && <Text style={styles.errorText}>{validationErrors.description}</Text>}

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
                                <Text>Are you sure you want to delete this category?</Text>
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
                <Text>No category available</Text>
            )}
        </View>
    );
};

export default CategoriesDetail;
