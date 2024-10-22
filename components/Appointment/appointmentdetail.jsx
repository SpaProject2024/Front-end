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

    useEffect(() => {
        const fetchAppointmentDetails = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/appointments/${appointmentID}`); // Cập nhật với endpoint API của bạn
                const data = await response.json();
                setAppointment(data); // Giả định dữ liệu trả về có cấu trúc giống như bạn cần
            } catch (error) {
                console.error('Error fetching appointment details:', error);
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

    const handleSave = () => {
        setIsDeleting(false);
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
            <View style={detailStyles.header}>
                <TouchableOpacity onPress={goBack} style={detailStyles.backButton}>
                    <Icon name='arrow-back' size={24} color="#b0b0b0" />
                </TouchableOpacity>
                <Text style={detailStyles.title}>Appointment Detail</Text>
                <Text style={detailStyles.title}>ID: {appointmentID}</Text>
            </View>
            <View style={detailStyles.card}>
                <View>
                    <View style={detailStyles.row}>
                        <Text style={detailStyles.labeltext}>
                            <Text style={detailStyles.patientName}>{appointment.patient}</Text>
                        </Text>
                        {!appointment.completed && (
                            <TouchableOpacity style={detailStyles.editButton} onPress={handleEdit}>
                                <Icon name="pencil" size={15} color="#ffffff" />
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={detailStyles.separator} />
                    <View style={detailStyles.row}>
                        <Text style={detailStyles.label}>Thời gian:</Text>
                        <Text style={detailStyles.value}>{appointment.appointmentDate}</Text>
                    </View>
                    <View style={detailStyles.row}>
                        <Text style={detailStyles.label}>Dịch vụ:</Text>
                        <Text style={detailStyles.value}>{appointment.services.map(service => service.name).join(', ')}</Text>
                    </View>
                    <View style={detailStyles.row}>
                        <Text style={detailStyles.label}>Ghi chú:</Text>
                        <Text style={detailStyles.value}>{appointment.status}</Text>
                    </View>
                    <View style={detailStyles.row}>
                        <Text style={detailStyles.label}>Trạng thái:</Text>
                        <Text style={detailStyles.value}>{appointment.status}</Text>
                    </View>
                    {!appointment.completed && (
                        <TouchableOpacity style={detailStyles.deleteButton} onPress={handleDelete}>
                            <Text style={detailStyles.deleteButtonText}>Cancel Appointment</Text>
                        </TouchableOpacity>
                    )}
                </View>
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
                            <TextInput
                                style={detailStyles.input}
                                value={appointment.patient}
                                onChange={(text) => setAppointment({ ...appointment, patient: text })}
                            />
                            <TextInput
                                style={detailStyles.input}
                                value={new Date(appointment.time).toLocaleDateString()}
                                onChange={(text) => setAppointment({ ...appointment, time: text })}
                            />
                            <TextInput
                                style={detailStyles.input}
                                value={appointment.service}
                                onChange={(text) => setAppointment({ ...appointment, service: text })}
                            />
                            <TextInput
                                style={detailStyles.input}
                                value={appointment.text}
                                onChange={(text) => setAppointment({ ...appointment, notes: text })}
                            />
                            <TextInput
                                style={detailStyles.input}
                                value={appointment.text}
                                onChange={(text) => setAppointment({ ...appointment, notes: text })}
                            />
                            <TextInput
                                style={detailStyles.input}
                                value={appointment.text}
                                onChange={(text) => setAppointment({ ...appointment, notes: text })}
                            />
                            <TextInput
                                style={detailStyles.input}
                                value={appointment.text}
                                onChange={(text) => setAppointment({ ...appointment, notes: text })}
                            />
                            <TextInput
                                style={detailStyles.input}
                                value={appointment.text}
                                onChange={(text) => setAppointment({ ...appointment, notes: text })}
                            />
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
        </View >
    );
};



export default AppointmentDetail;
