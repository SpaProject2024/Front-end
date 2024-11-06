import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert, Modal, TextInput } from "react-native";
import axios from "axios";
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from "./styles";
import { useNavigation } from '@react-navigation/native';
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../LocalIP/localIP';

const CategoriesManager = () => {
    const navigation = useNavigation();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: '', description: '' });
    const router = useRouter();
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/categories`);
                setCategories(response.data.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const openModal = () => {
        setModalVisible(true);
        setNewCategory({ name: '', description: '' });
    };

    const handleAddCategory = async () => {
        if (validateForm()) {
            try {
                const token = await AsyncStorage.getItem('token');
                const response = await axios.post(`${API_BASE_URL}/categories`, {
                    name: newCategory.name,
                    description: newCategory.description,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'ngrok-skip-browser-warning': '69420'
                    },
                });
                setCategories([...categories, response.data.data]);
                closeModal();
                Alert.alert("Success", "Category added successfully");
            } catch (error) {
                Alert.alert("Error", "Failed to add category");
            }
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!newCategory.name) {
            errors.name = "Name is required.";
        }
        if (!newCategory.description) {
            errors.description = "Description is required.";
        }
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const closeModal = () => {
        setModalVisible(false);
        setValidationErrors({});
    };
    const handleViewDetail = async (categories) => {
        try {
            await AsyncStorage.setItem('categoriesId', categories._id);  // Lưu id vào AsyncStorage
            router.push('/categoriesdetail/categoriesdetail');  // Điều hướng sang trang chi tiết nhà cung cấp
        } catch (e) {
            console.log('Error storing supplier id', e);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Icon name='arrow-back' size={24} color="#ffffff" />
                </TouchableOpacity>
                <Text style={styles.title}>Category List</Text>
            </View>
            <TouchableOpacity onPress={openModal} style={styles.addButton}>
                <Icon name="add" size={30} color="#fff" />
            </TouchableOpacity>
            <FlatList
                data={categories}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.supplierItem}>
                        <View style={styles.infoContainer}>
                        <View style={styles.row}>
                                <Text style={styles.label}>Name:</Text>
                                <Text style={styles.value}>{item.name}</Text>
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
                        <Text style={styles.modalTitle}>Add New Category</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            value={newCategory.name}
                            onChangeText={(text) => setNewCategory({ ...newCategory, name: text })}
                        />
                        {validationErrors.name && <Text style={styles.errorText}>{validationErrors.name}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Description"
                            value={newCategory.description}
                            onChangeText={(text) => setNewCategory({ ...newCategory, description: text })}
                        />
                        {validationErrors.description && <Text style={styles.errorText}>{validationErrors.description}</Text>}

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={handleAddCategory} style={styles.saveButton}>
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

export default CategoriesManager;
