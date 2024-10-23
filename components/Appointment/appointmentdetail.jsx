import React, { useState, useEffect } from 'react';
import { View, Text, detailStylesheet, TouchableOpacity, Alert, Button, TextInput, Modal, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { detailStyles } from "./styles";
import { API_BASE_URL } from '../../LocalIP/localIP';

const AppointmentDetail = () => {
    const navigation = useNavigation();
    const route = useRoute();
    // Lấy appointmentID từ route.params
    const { appointmentID } = route.params;
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [appointment, setAppointment] = useState(null);
    const [diagnosisContent, setDiagnosisContent] = useState('');
    const [diagnoses, setDiagnoses] = useState([]); // Danh sách chuẩn đoán
    useEffect(() => {
        const fetchAppointmentDetails = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/appointments/${appointmentID}`); // Cập nhật với endpoint API của bạn
                const result = await response.json();
                setAppointment(result.data); // Giả định dữ liệu trả về có cấu trúc giống như bạn cần
                fetchDiagnoses(result.data.user._id);
            } catch (error) {
                console.error('Error fetching appointment details:', error);
            }
        };
        const fetchDiagnoses = async (userId) => {
            try {
                const response = await fetch(`${API_BASE_URL}/diagnose`); // Endpoint để lấy tất cả các chuẩn đoán
                // Kiểm tra xem phản hồi có thành công hay không
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Error fetching diagnoses:', errorText);
                    throw new Error(`Error fetching diagnoses: ${response.statusText}`);
                }
                const result = await response.json();
                // Lọc các chuẩn đoán có userId trùng
                const userDiagnoses = result.filter((diagnosis) => diagnosis.userId._id === userId);
                setDiagnoses(userDiagnoses);
                console.log("Filtered User Diagnoses:", userDiagnoses);
            } catch (error) {
                console.error('Error fetching diagnoses:', error);
            }
        };
        fetchAppointmentDetails();
    }, [appointmentID]);

    const goBack = () => {
        navigation.goBack();
    };

    const handleEdit = () => {
        setIsUpdating(true);
    };

    const handleDelete = () => {
        setIsDeleting(true);
    };

    const handleSave = async () => {
        try {
            const diagnosisResponse = await fetch(`${API_BASE_URL}/diagnose`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    appointmentId: appointment._id,
                    userId: appointment.user._id,
                    content: diagnosisContent,
                    productId: null, // Thay null bằng productId nếu có
                }),
            });
            if (!diagnosisResponse.ok) {
                const errorData = await diagnosisResponse.json(); // Lấy thêm thông tin lỗi
                throw new Error(errorData.message || 'Failed to save diagnosis');
            }
            const result = await diagnosisResponse.json();
            setIsUpdating(false);
            Alert.alert('Thông báo', 'Thêm chuẩn đoán thành công!');
            // Cập nhật lại nội dung chuẩn đoán trong trạng thái nếu cần
            setDiagnosisContent('');
        } catch (error) {
            console.error('Error saving diagnosis:', error);
            Alert.alert('Lỗi', error.message || 'Thêm chuẩn đoán thất bại. Vui lòng thử lại!');
        }
    };

    const confirmDelete = () => {
        Alert.alert("Thông báo", "Bạn có chắc muốn xóa lịch sử hẹn này không?",
            [
                {
                    text: "Hủy",
                    onPress: () => setIsDeleting(false),
                    detailStyles: "cancel",
                },
                {
                    text: "Hủy",
                    onPress: () => {
                        navigation.goBack();
                    }
                },
            ]);
    };

    if (!appointment) {
        return (
            <View style={detailStyles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }
    return (
        <View style={detailStyles.container}>
            <ScrollView>
                <View style={detailStyles.header}>
                    <TouchableOpacity onPress={goBack} style={detailStyles.backButton}>
                        <Icon name='arrow-back' size={24} color="#b0b0b0" />
                    </TouchableOpacity>
                    <Text style={detailStyles.title}>Appointment Detail</Text>
                </View>
                <View style={detailStyles.card}>
                    <View>
                        <View style={detailStyles.row}>
                            <Text style={detailStyles.labeltext}>
                                <Text style={detailStyles.patientName}>{appointment.user.name}</Text>
                            </Text>
                            {!appointment.completed && (
                                <TouchableOpacity style={detailStyles.editButton} onPress={handleEdit}>
                                    <Icon name="pencil" size={15} color="#ffffff" />
                                </TouchableOpacity>
                            )}
                        </View>
                        <View style={detailStyles.separator} />
                        <View style={detailStyles.row}>
                            <Text style={detailStyles.label}>Doctor:</Text>
                            <Text style={detailStyles.value}>{appointment.doctor.fullName}</Text>
                        </View>
                        <View style={detailStyles.row}>
                            <Text style={detailStyles.label}>Time:</Text>
                            <Text style={detailStyles.value}>{new Date(appointment.appointmentDate).toLocaleString()}</Text>
                        </View>
                        <View style={detailStyles.row}>
                            <Text style={detailStyles.label}>Diagnosis:</Text>
                            <Text style={detailStyles.value}>
                                {appointment.services.map(service => service.name).join(', ')}
                            </Text>
                        </View>
                        <View style={detailStyles.row}>
                            <Text style={detailStyles.label}>Status:</Text>
                            <Text style={detailStyles.value}>{appointment.status}</Text>
                        </View>
                    </View>
                    {!appointment.completed && (
                        <TouchableOpacity style={detailStyles.deleteButton} onPress={handleDelete}>
                            <Text style={detailStyles.deleteButtonText}>Cancel Appointment</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <View style={detailStyles.card}>
                    {diagnoses.length === 0 ? (
                        <Text>No diagnoses found for this user.</Text>
                    ) : (
                        diagnoses.map((diagnosis, index) => (
                            <View key={index} style={detailStyles.diagnosisContainer}>
                                <View style={detailStyles.row}>
                                    <Text style={detailStyles.labeltext}>
                                        <Text style={detailStyles.patientName}>{appointment.user.name}</Text>
                                    </Text>
                                </View>
                                <View style={detailStyles.separator} />
                                <View style={detailStyles.row}>
                                    <Text style={detailStyles.label}>Doctor:</Text>
                                    <Text style={detailStyles.value}>{appointment.doctor.fullName}</Text>
                                </View>
                                <View style={detailStyles.row}>
                                    <Text style={detailStyles.label}>Time:</Text>
                                    <Text style={detailStyles.value}>{new Date(diagnosis.createdAt).toLocaleString()}</Text>
                                </View>
                                <View style={detailStyles.row}>
                                    <Text style={detailStyles.label}>Service:</Text>
                                    <Text style={detailStyles.value}>
                                        {appointment.services.map(service => service.name).join(', ')}
                                    </Text>
                                </View>
                                <View style={detailStyles.row}>
                                    <Text style={detailStyles.label}>Diagnosis:</Text>
                                    <Text style={detailStyles.value}>{diagnosis.content}</Text>
                                </View>
                                <View style={detailStyles.row}>
                                    <Text style={detailStyles.label}>Status:</Text>
                                    <Text style={detailStyles.value}>{appointment.status}</Text>
                                </View>
                            </View>
                        ))
                    )}
                </View>

                <Modal
                    visible={isUpdating}
                    animationType='slide'
                    transparent={true}
                    onRequestClose={() => setIsUpdating(false)}
                >
                    <View style={detailStyles.modalContainer}>
                        <View style={detailStyles.modalContent}>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                            >
                                <View style={detailStyles.modalheader}>
                                    <TouchableOpacity onPress={() => setIsUpdating(false)}>
                                        <Icon name='arrow-back' size={24} color="#b0b0b0" />
                                    </TouchableOpacity>
                                    <Text style={detailStyles.modalTitle}>Update Appointment</Text>
                                </View>
                                <View style={detailStyles.row}>
                                    <Text style={detailStyles.input}>{appointment.user.name}</Text>
                                </View>
                                <View style={detailStyles.row}>
                                    <Text style={detailStyles.input}>{new Date(appointment.appointmentDate).toLocaleString()}</Text>
                                </View>
                                <View style={detailStyles.row}>
                                    <Text style={detailStyles.input}>{appointment.services.map(service => service.name).join(', ')}</Text>
                                </View>
                                <View style={detailStyles.row}>
                                    <TextInput
                                        style={detailStyles.input}
                                        value={diagnosisContent}
                                        onChangeText={setDiagnosisContent}
                                        placeholder="Diagnosis Content"
                                    />
                                </View>
                                <View style={detailStyles.modalButtonContainer}>
                                    <TouchableOpacity
                                        style={[detailStyles.saveButton]}
                                        onPress={handleSave}
                                    >
                                        <Text style={detailStyles.saveButtonText}>Save</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>

                {isDeleting && (
                    <Modal
                        visible={isDeleting}
                        animationType="fade"
                        transparent={true}
                        onRequestClose={() => setIsDeleting(false)}
                    >
                        <View style={detailStyles.modalContainer}>
                            <View style={detailStyles.modalContentdelete}>
                                <View style={detailStyles.modalheaderdelete}>
                                    <Text style={detailStyles.modalTitledelete}>Delete Appointment</Text>
                                </View>
                                <Text style={detailStyles.deleteMessage}>Are you sure you want to delete this appointment?</Text>
                                <View style={detailStyles.modalButtondelete}>
                                    <TouchableOpacity style={detailStyles.deleteButton} onPress={confirmDelete}>
                                        <Text style={detailStyles.deleteButtonText}>Delete</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={detailStyles.deleteButton} onPress={() => setIsDeleting(false)}>
                                        <Text style={detailStyles.deleteButtonText}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                )}
            </ScrollView>
        </View >
    );
};



export default AppointmentDetail;