import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Button, Modal, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../LocalIP/localIP';
import { styles } from "./styles";
import Icon from 'react-native-vector-icons/Ionicons'; // Import biểu tượng
import { useRouter } from "expo-router";
const SupplierDetail = () => {
    const router = useRouter();
    const [supplier, setSupplier] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false); // Modal xác nhận xóa
    const [updatedSupplier, setUpdatedSupplier] = useState({ name: '', numberphone: '', address: '' });
    const [validationErrors, setValidationErrors] = useState({});


    useEffect(() => {
        const fetchSupplierDetail = async () => {
            try {
                const supplierId = await AsyncStorage.getItem('supplierId');
                if (supplierId) {
                    const response = await axios.get(`${API_BASE_URL}/suppliers/${supplierId}`);
                    setSupplier(response.data.data);
                }
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchSupplierDetail();
    }, []);

    const handleUpdate = async () => {
        if (validateForm()) {
            try {
                const supplierId = await AsyncStorage.getItem('supplierId');
                if (supplierId) {
                    await axios.put(`${API_BASE_URL}/suppliers/${supplierId}`, updatedSupplier);
                    setSupplier(updatedSupplier);
                    setModalVisible(false); // Đóng modal sau khi cập nhật
                }
            } catch (error) {
                setError(error.message);
            }
        }
    };

    const handleDelete = async () => {
        try {
            const supplierId = await AsyncStorage.getItem('supplierId');
            if (supplierId) {
                // Xóa nhà cung cấp
                await axios.delete(`${API_BASE_URL}/suppliers/${supplierId}`);
                setSupplier(null); // Xóa supplier khỏi UI sau khi xóa thành công
                router.push('/suppliermanager/suppliermanager'); // Quay lại danh sách nhà cung cấp
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!updatedSupplier.name) {
            errors.name = "Name is required.";
        }

        // Kiểm tra số điện thoại
        const phoneRegex = /^\d{10}$/; // Biểu thức chính quy cho 10 chữ số
        if (!updatedSupplier.numberphone) {
            errors.numberphone = "Phone number is required.";
        } else if (!phoneRegex.test(updatedSupplier.numberphone)) {
            errors.numberphone = "Phone number must be 10 digits and contain only numbers";
        }

        if (!updatedSupplier.address) {
            errors.address = "Address is required.";
        }
        console.log(errors); // Kiểm tra xem errors có được cập nhật không
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };


    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }
    const goBack = () => {
        router.push('/suppliermanager/suppliermanager');
    };
    return (
        <View style={styles.container}>

            {supplier ? (
                <>
                    <TouchableOpacity onPress={goBack} style={styles.backButton}>
                        <Icon name='arrow-back' size={24} color="#b0b0b0" />
                        <Text style={styles.titlename}>{supplier.name}</Text>
                    </TouchableOpacity>
                    <Text style={styles.detailText}>Phone: {supplier.numberphone}</Text>
                    <Text style={styles.detailText}>Address: {supplier.address}</Text>


                    {/* Nút Update */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => {
                            setModalVisible(true);
                            setUpdatedSupplier({
                                name: supplier.name,
                                numberphone: supplier.numberphone,
                                address: supplier.address
                            });
                        }}>
                            <Icon name="pencil" size={30} color="green" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setConfirmDeleteVisible(true)}>
                            <Icon name="trash" size={30} color="red" />
                        </TouchableOpacity>
                    </View>
                    {/* Form Popup */}
                    <Modal visible={modalVisible} animationType="slide" transparent={true}>
                        <View style={styles.modalBackground}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalTitle}>Update Supplier</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Name"
                                    value={updatedSupplier.name}
                                    onChangeText={(text) => setUpdatedSupplier({ ...updatedSupplier, name: text })}
                                />
                                {validationErrors.name && <Text style={styles.errorText}>{validationErrors.name}</Text>}

                                <TextInput
                                    style={styles.input}
                                    placeholder="Phone Number"
                                    value={updatedSupplier.numberphone}
                                    onChangeText={(text) => setUpdatedSupplier({ ...updatedSupplier, numberphone: text })}
                                />
                                {validationErrors.numberphone && <Text style={styles.errorText}>{validationErrors.numberphone}</Text>}

                                <TextInput
                                    style={styles.input}
                                    placeholder="Address"
                                    value={updatedSupplier.address}
                                    onChangeText={(text) => setUpdatedSupplier({ ...updatedSupplier, address: text })}
                                />
                                {validationErrors.address && <Text style={styles.errorText}>{validationErrors.address}</Text>}

                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
                                        <Text style={styles.saveButtonText}>Save</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.cancelButton}
                                        onPress={() => {
                                            setModalVisible(false);
                                            setValidationErrors({}); // Đặt lại lỗi khi bấm Cancel
                                        }}>
                                        <Text style={styles.cancelButtonText}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    </Modal>

                    {/* Modal Xác nhận Xóa */}
                    <Modal visible={confirmDeleteVisible} animationType="slide" transparent={true}>
                        <View style={styles.modalBackground}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalTitle}>Confirm Delete</Text>
                                <Text>Are you sure you want to delete this supplier?</Text>
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
                <Text>No appointments available</Text>
            )
            }
        </View >
    );
};


export default SupplierDetail;
