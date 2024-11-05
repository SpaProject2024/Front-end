import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Button, Modal, TextInput, Image, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../LocalIP/localIP';
import { styles } from "./styles";
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from "expo-router";

const DoctorDetail = () => {
    const router = useRouter();
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
    const [updatedDoctor, setUpdatedDoctor] = useState({
        fullName: '', numberPhone: '', avatar: '', address: '', birthday: '', experience: '', description: '', workingtime: ''
    });
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        const fetchDoctorDetail = async () => {
            try {
                const doctorId = await AsyncStorage.getItem('doctormanagerId');
                if (doctorId) {
                    const response = await axios.get(`${API_BASE_URL}/doctor/${doctorId}`);
                    setDoctor(response.data.data);
                }
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchDoctorDetail();
    }, []);

    const handleUpdate = async () => {
        if (validateForm()) {
            try {
                const token = await AsyncStorage.getItem('token');
                const doctorId = await AsyncStorage.getItem('doctormanagerId');
                if (doctorId) {
                    await axios.put(`${API_BASE_URL}/doctor/${doctorId}`, updatedDoctor, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                            'ngrok-skip-browser-warning': '69420'
                        },
                    });
                    setDoctor(updatedDoctor);
                    setModalVisible(false);
                }
            } catch (error) {
                setError(error.message);
            }
        }
    };

    const handleDelete = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const doctorId = await AsyncStorage.getItem('doctormanagerId');
            if (doctorId) {
                await axios.delete(`${API_BASE_URL}/doctor/${doctorId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                        'ngrok-skip-browser-warning': '69420'
                    },
                });
                setDoctor(null);
                router.push('/doctormanager/doctormanager');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!updatedDoctor.fullName) {
            errors.fullName = "Full name is required.";
        }

        const phoneRegex = /^\d{10}$/;
        if (!updatedDoctor.numberPhone) {
            errors.numberPhone = "Phone number is required.";
        } else if (!phoneRegex.test(updatedDoctor.numberPhone)) {
            errors.numberPhone = "Phone number must be 10 digits and contain only numbers.";
        }

        if (!updatedDoctor.address) {
            errors.address = "Address is required.";
        }
        if (!updatedDoctor.birthday) {
            errors.birthday = "Birthday is required.";
        }
        if (!updatedDoctor.experience) {
            errors.experience = "Experience is required.";
        } else if (isNaN(updatedDoctor.experience)) {
            errors.experience = "Experience must be a number.";
        }
        if (!updatedDoctor.description) {
            errors.description = "Description is required.";
        }
        if (!updatedDoctor.workingtime) {
            errors.workingtime = "Working time is required.";
        } else if (isNaN(updatedDoctor.workingtime)) {
            errors.workingTime = "Working time must be a number.";
        }
        if (!updatedDoctor.avatar) {
            errors.avatar = "Avatar is required.";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    const goBack = () => {
        router.push('/doctormanager/doctormanager');
    };

    return (
        <View style={styles.container}>
            {doctor ? (
                <>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={goBack} style={styles.backButton}>
                            <Icon name='arrow-back' size={24} color="#fff" />
                        </TouchableOpacity>
                        <Text style={styles.title}>Doctor Detail</Text>
                    </View>
                    <View style={styles.card}>
                        <Image source={{ uri: doctor.avatar }} style={styles.avatar} />
                        <Text style={styles.titlename}>{doctor.fullName}</Text>
                        <View style={styles.row}>
                            <Text style={styles.label}>Phone:</Text>
                            <Text style={styles.value}>{doctor.numberPhone}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Address:</Text>
                            <Text style={styles.value}>{doctor.address}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Birthday:</Text>
                            <Text style={styles.value}>{doctor.birthday}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Experience:</Text>
                            <Text style={styles.value}>{doctor.experience} years</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Working Time:</Text>
                            <Text style={styles.value}>{doctor.workingtime}</Text>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => {
                                setModalVisible(true);
                                setUpdatedDoctor({
                                    fullName: doctor.fullName,
                                    numberPhone: doctor.numberPhone,
                                    avatar: doctor.avatar,
                                    address: doctor.address,
                                    birthday: doctor.birthday,
                                    experience: doctor.experience,
                                    description: doctor.description,
                                    workingtime: doctor.workingtime
                                });
                            }}>
                                <Icon name="pencil" size={30} color="green" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setConfirmDeleteVisible(true)}>
                                <Icon name="trash" size={30} color="red" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Modal visible={modalVisible} animationType="slide" transparent={true}>
                        <View style={styles.modalBackground}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalTitle}>Update Doctor</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Full Name"
                                    value={updatedDoctor.fullName}
                                    onChangeText={(text) => setUpdatedDoctor({ ...updatedDoctor, fullName: text })}
                                />
                                {validationErrors.fullName && <Text style={styles.errorText}>{validationErrors.fullName}</Text>}

                                <TextInput
                                    style={styles.input}
                                    placeholder="Phone Number"
                                    value={String(updatedDoctor.numberPhone)}
                                    onChangeText={(text) => setUpdatedDoctor({ ...updatedDoctor, numberPhone: text })}
                                    keyboardType="numeric"
                                />
                                {validationErrors.numberPhone && <Text style={styles.errorText}>{validationErrors.numberPhone}</Text>}

                                <TextInput
                                    style={styles.input}
                                    placeholder="Address"
                                    value={updatedDoctor.address}
                                    onChangeText={(text) => setUpdatedDoctor({ ...updatedDoctor, address: text })}
                                />
                                {validationErrors.address && <Text style={styles.errorText}>{validationErrors.address}</Text>}

                                <TextInput
                                    style={styles.input}
                                    placeholder="Birthday"
                                    value={updatedDoctor.birthday}
                                    onChangeText={(text) => setUpdatedDoctor({ ...updatedDoctor, birthday: text })}
                                />

                                <TextInput
                                    style={styles.input}
                                    placeholder="Experience"
                                    value={updatedDoctor.experience}
                                    onChangeText={(text) => setUpdatedDoctor({ ...updatedDoctor, experience: text })}
                                    keyboardType="numeric"
                                />

                                <TextInput
                                    style={styles.input}
                                    placeholder="Description"
                                    value={updatedDoctor.description}
                                    onChangeText={(text) => setUpdatedDoctor({ ...updatedDoctor, description: text })}
                                />

                                <TextInput
                                    style={styles.input}
                                    placeholder="Working Time"
                                    value={updatedDoctor.workingtime}
                                    onChangeText={(text) => setUpdatedDoctor({ ...updatedDoctor, workingtime: text })}
                                />

                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
                                        <Text style={styles.saveButtonText}>Save</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.cancelButton} onPress={() => {
                                        setModalVisible(false);
                                        setValidationErrors({});
                                    }}>
                                        <Text style={styles.cancelButtonText}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    <Modal visible={confirmDeleteVisible} animationType="slide" transparent={true}>
                        <View style={styles.modalBackground}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalTitle}>Confirm Delete</Text>
                                <Text>Are you sure you want to delete this doctor?</Text>
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
                <Text>No doctor available</Text>
            )}
        </View>
    );
};

export default DoctorDetail;
