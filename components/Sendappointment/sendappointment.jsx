import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, Image, TouchableOpacity, Modal, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import Logo from "../../assets/images/logo2.png";
import { API_BASE_URL } from '../../LocalIP/localIP';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from "expo-router";
import { styles } from "./styles";

export default function sendappointment() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [doctorID, setDoctorID] = useState(''); // ID của doctor
    const [managers, setManagers] = useState([]);
    const [selectedManager, setSelectedManager] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility

    const fetchManagers = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/managers`);
            console.log(response.data);
            setManagers(response.data); // Giả sử API trả về mảng quản lý
        } catch (error) {
            Alert.alert('Lỗi', 'Không thể lấy danh sách quản lý');
        }
    };

    useEffect(() => {
        fetchManagers(); // Gọi hàm để lấy danh sách quản lý khi component mount
    }, []);


    const handleSubmit = async () => {
        if (title && description && selectedManager && doctorID) {
            try {
                const response = await axios.post(`${API_BASE_URL}/sendappointment`, {
                    managerID: selectedManager.id,
                    doctorID,
                    content: description,
                    title,
                    datasent: new Date(),
                });
                if (response.status === 201) {
                    Alert.alert('Thông báo', 'đơn dã được gửi thành công!');
                } else {
                    Alert.alert('Lỗi', data.message);
                }
            } catch (error) {
                Alert.alert('Lỗi', 'có lỗi xảy ra trong quá trình gửi đơn');
            }
        } else {
            Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin!');
        }
    };

    const renderManagerItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => {
                setSelectedManager(item); // Lưu thông tin quản lý đã chọn
                setIsModalVisible(false); // Đóng modal
            }}>
                <Text style={styles.managerItem}>{item.email ? item.email : 'Không có email'}</Text> {/* Hiển thị email hoặc thông báo không có */}
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
                    placeholder="Mô tả lý do xin nghỉ"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    numberOfLines={5}
                />
                <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                    <Text style={styles.selectedManager}>
                        {selectedManager ? selectedManager.email : 'Chọn quản lý'}
                    </Text>
                </TouchableOpacity>

                {/* Modal để chọn quản lý */}
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
                    <Button title="Gửi đơn" onPress={handleSubmit} color="#4CAF50" />
                </View>
            </View>

        </ScrollView >
    );
}

