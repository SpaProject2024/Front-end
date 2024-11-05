import React, { useState, useEffect, cloneElement } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { styles } from "./styles";
import { API_BASE_URL } from '../../LocalIP/localIP';

const EditProfile = () => {
    const router = useRouter();
    // Khởi tạo state cho thông tin người dùng
    const [userData, setUserData] = useState(null);
    // Khởi tạo state cho từng thông tin cần chỉnh sửa
    const [fullName, setFullName] = useState('');
    const [numberPhone, setNumberPhone] = useState(null);
    const [address, setAddress] = useState('');
    const [birthday, setBirthday] = useState(null);

    // Thông tin bổ sung cho doctor
    const [avatar, setAvatar] = useState('');
    const [experience, setExperience] = useState(0);
    const [description, setDescription] = useState('');
    const [workingtime, setWorkingtime] = useState(0);

    // Thông tin bổ sung cho staff
    const [membershipLevel, setMembershipLevel] = useState('Bronze');

    // Thông tin bổ sung cho customer
    const [position, setPosition] = useState('');
    const [salary, setSalary] = useState(0);
    const [error, setError] = useState('');

    // Lấy thông tin từ AsyncStorage khi component được mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await AsyncStorage.getItem('userdata');
                if (user !== null) {
                    const parsedData = JSON.parse(user);
                    setUserData(parsedData.data);
                    console.log("phuc", parsedData.data.doctorId);
                    // Only fetch detailed info for doctors
                    if (parsedData.data.role === 'doctor') {
                        const response = await axios.get(`${API_BASE_URL}/doctor/${parsedData.data.doctorId}`);
                        const doctorData = response.data;
                        setFullName(doctorData.data.fullName || '');
                        setNumberPhone(doctorData.data.numberPhone || '');
                        setAvatar(doctorData.data.avatar || '');
                        setAddress(doctorData.data.address || '');
                        setBirthday(doctorData.data.birthday || '');
                        setExperience(doctorData.data.experience || 0);
                        setDescription(doctorData.data.description || '');
                        setWorkingtime(doctorData.data.workingtime || 0);
                    } else if (parsedData.data.role === 'customer') {
                        const response = await axios.get(`${API_BASE_URL}/customer/${parsedData.data.customerId}`);
                        const customerData = response.data;
                        // console.log("hau", customerData);
                        // Set default values for staff
                        setFullName(customerData.data.fullName || '');
                        setNumberPhone(customerData.data.numberPhone || '');
                        setAddress(customerData.data.address || '');
                        setBirthday(customerData.data.birthday ? customerData.data.birthday.split('T')[0] : '');
                        setMembershipLevel(customerData.data.membershipLevel || 'Bronze');
                    } else if (parsedData.data.role === 'staff') {
                        const response = await axios.get(`${API_BASE_URL}/staff/${parsedData.data.staffId}`);
                        const staffData = response.data;
                        console.log("hau", staffData);
                        // Set default values for customers
                        setFullName(staffData.data.fullName || '');
                        setNumberPhone(staffData.data.numberPhone || '');
                        setAddress(staffData.data.address || '');
                        setBirthday(staffData.data.birthday ? staffData.data.birthday.split('T')[0] : '');
                        setPosition(staffData.data.position || '');
                        setSalary(staffData.data.salary || '');
                    } else if (parsedData.data.role === 'manager') {
                        const response = await axios.get(`${API_BASE_URL}/manager/${parsedData.data.managerId}`);
                        const managerData = response.data;
                        console.log("hau", managerData);
                        // Set default values for customers
                        setFullName(managerData.fullName || '');
                        setNumberPhone(managerData.numberPhone || '');
                        setAddress(managerData.address || '');
                        setBirthday(managerData.data.birthday ? managerData.data.birthday.split('T')[0] : '');
                        setBirthday(managerData.birthday || '');
                        setPosition(managerData.position || '');
                        setSalary(managerData.salary || '');
                    }
                }
            } catch (error) {
                console.error('Failed to load user data from AsyncStorage or API:', error);
            }
        };
        fetchData();
    }, []);

    // const validateBirthday = (date) => {
    //     const regex = /^\d{4}-\d{2}-\d{2}$/;
    //     return regex.test(date);
    // };

    // const handleBirthdayChange = (date) => {
    //     if (validateBirthday(date)) {
    //         setBirthday(date);
    //         setError('');
    //     } else {
    //         setError('Birthday must be in the format YYYY-MM-DD');
    //     }
    // };

    // Function để lưu thông tin sau khi chỉnh sửa
    const saveChanges = async () => {
        
        if (!userData) return;
        let apiUrl = '';
        let updateData = {};
        // Xác định API và dữ liệu dựa trên role
        if (userData.role === 'doctor') {
            apiUrl = `${API_BASE_URL}/doctor/${userData.doctorId}`;
            updateData = {
                fullName,
                numberPhone,
                avatar,
                address,
                birthday,
                experience,
                description,
                workingtime,
            };
        } else if (userData.role === 'staff') {
            apiUrl = `${API_BASE_URL}/staff/${userData.staffId}`;
            updateData = {
                fullName,
                numberPhone,
                address,
                birthday,
                membershipLevel,
            };
        } else if (userData.role === 'customer') {
            apiUrl = `${API_BASE_URL}/customer/${userData.customerId}`;
            updateData = {
                fullName,
                numberPhone,
                position,
                address,
                birthday,
                salary,
            };
        }
        try {
            const token = await AsyncStorage.getItem('token'); // Get token from AsyncStorage
            const response = await axios.put(apiUrl, updateData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Use the token for authorization
                    'ngrok-skip-browser-warning': '69420'
                },
            });

            if (response.status === 200) {
                Alert.alert("Success", "Update successfully!", [
                    {
                        text: "OK",
                        onPress: () => router.push("MyAccount/myAccount"),
                    },
                ]);
                console.log('Update Success:', response.data);
            }
        } catch (error) {
            console.error('Update Error:', error);
            Alert.alert("Error", "Failed to update profile");
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.back}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <View style={styles.headerprofile}>
                <View style={styles.avatarContainer}>
                    <Image
                        style={styles.avatar}
                        source={{
                            uri: avatar
                                ? avatar
                                : 'https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-male-avatar-image-in-the-circle-image_2908803.jpg'
                        }}
                    />

                    <TouchableOpacity style={styles.cameraIcon}>
                        <Icon name="camera" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.inputContainer}>
                {/* Input chung cho các vai trò */}
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                    style={styles.input}
                    value={fullName}
                    onChangeText={setFullName}
                />

                <Text style={styles.label}>Number Phone</Text>
                <TextInput
                    style={styles.input}
                    value={String(numberPhone)}
                    onChangeText={(text) => setNumberPhone(text)}
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Address</Text>
                <TextInput
                    style={styles.input}
                    value={address}
                    onChangeText={setAddress}
                />

                <Text style={styles.label}>Birthday: (YYYY-MM-DD)</Text>
                <TextInput
                    style={styles.input}
                    value={birthday}
                    onChangeText={setBirthday}
                    placeholder="YYYY-MM-DD"
                />


                {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
                {/* Input riêng cho doctor */}
                {userData && userData.role === 'doctor' && (
                    <>
                        <Text style={styles.label}>Avatar</Text>
                        <TextInput
                            style={styles.input}
                            value={avatar}
                            onChangeText={setAvatar}
                        />

                        <Text style={styles.label}>Experience</Text>
                        <TextInput
                            style={styles.input}
                            value={String(experience)}
                            onChangeText={setExperience}
                            keyboardType="numeric"
                        />

                        <Text style={styles.label}>Description</Text>
                        <TextInput
                            style={styles.input}
                            value={description}
                            onChangeText={setDescription}
                        />
                    </>
                )}

                {/* Input riêng cho staff */}
                {userData && userData.role === 'customer' && (
                    <>
                        <Text style={styles.label}>Membership Level</Text>
                        <TextInput
                            style={styles.input}
                            value={membershipLevel}
                            onChangeText={setMembershipLevel}
                        />
                    </>
                )}

                <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
                    <Text style={styles.saveButtonText}>Edit</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};



export default EditProfile;