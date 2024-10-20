import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert, Modal, TextInput } from "react-native";
import axios from "axios";
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from "./styles";
import { useRouter } from "expo-router"; // Hoặc từ 'react-router-dom'
import AsyncStorage from '@react-native-async-storage/async-storage';  // Import AsyncStorage
import { API_BASE_URL } from '../../LocalIP/localIP';

const SupplierManager = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [newSupplier, setNewSupplier] = useState({ name: '', numberphone: '', address: '' }); // State để lưu thông tin nhà cung cấp mới
    const router = useRouter();
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/suppliers`);
                setSuppliers(response.data.data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchSuppliers();
    }, []);

    const openModal = () => {
        setModalVisible(true); // Mở modal
        setNewSupplier({ name: '', numberphone: '', address: '' }); // Reset thông tin nhà cung cấp mới
    };

    const handleAddSupplier = async () => {
        if (validateForm()) {
            try {
                // Chỉ gửi thông tin name, numberphone và address
                const response = await axios.post(`${API_BASE_URL}/suppliers`, {
                    name: newSupplier.name,
                    numberphone: newSupplier.numberphone,
                    address: newSupplier.address,
                });
                setSuppliers([...suppliers, response.data.data]); // Thêm nhà cung cấp mới vào danh sách
                closeModal(); // Đóng modal
                Alert.alert("Success", "Supplier added successfully");
            } catch (error) {
                Alert.alert("Error", "Failed to add supplier");
            }
        }
    };

    const handleViewDetail = async (supplier) => {
        try {
            await AsyncStorage.setItem('supplierId', supplier._id);  // Lưu id vào AsyncStorage
            router.push('/supplierdetail/supplierdetail');  // Điều hướng sang trang chi tiết nhà cung cấp
        } catch (e) {
            console.log('Error storing supplier id', e);
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!newSupplier.name) {
            errors.name = "Name is required.";
        }
        const phoneRegex = /^\d{10}$/; // Biểu thức chính quy cho 10 chữ số
        if (!newSupplier.numberphone) {
            errors.numberphone = "Phone number is required.";
        } else if (!phoneRegex.test(newSupplier.numberphone)) {
            errors.numberphone = "Phone number must be 10 digits and contain only numbers";
        }
        if (!newSupplier.address) {
            errors.address = "Address is required.";
        }
        console.log(errors); // Kiểm tra xem errors có được cập nhật không
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const closeModal = () => {
        setModalVisible(false);  // Đóng modal
        setValidationErrors({}); // Đặt lại lỗi khi bấm Cancel
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Supplier List</Text>
            <TouchableOpacity onPress={openModal} style={styles.addButton}>
                <Icon name="add" size={30} color="#fff" />
            </TouchableOpacity>
            <FlatList
                data={suppliers}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.supplierItem}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.supplierName}>{item._id}</Text>
                            <Text style={styles.supplierName}>Name: {item.name}</Text>
                            <Text style={styles.supplierPhone}>Phone: {item.numberphone}</Text>
                            <Text style={styles.supplierAddress}>Address: {item.address}</Text>
                            <TouchableOpacity onPress={() => handleViewDetail(item)} style={styles.viewButton}>
                                <Text style={styles.buttonText}>View</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                )}
            />
            {/* Modal để thêm nhà cung cấp mới */}
            <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Add New Supplier</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            value={newSupplier.name}
                            onChangeText={(text) => setNewSupplier({ ...newSupplier, name: text })}
                        />
                        {validationErrors.name && <Text style={styles.errorText}>{validationErrors.name}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Phone"
                            value={newSupplier.numberphone}
                            onChangeText={(text) => setNewSupplier({ ...newSupplier, numberphone: text })}
                        />
                        {validationErrors.numberphone && <Text style={styles.errorText}>{validationErrors.numberphone}</Text>}

                        <TextInput
                            style={styles.input}
                            placeholder="Address"
                            value={newSupplier.address}
                            onChangeText={(text) => setNewSupplier({ ...newSupplier, address: text })}
                        />
                        {validationErrors.address && <Text style={styles.errorText}>{validationErrors.address}</Text>}

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={handleAddSupplier} style={styles.saveButton}>
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

export default SupplierManager;
