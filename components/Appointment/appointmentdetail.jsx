import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Button, TextInput, Modal, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const AppointmentDetail = () => {
    const navigation = useNavigation();
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [appointment, setAppointment] = useState({
        id: '1',
        time: '2024-09-17T08:00:00',
        patient: 'Nguyễn Văn A',
        service: 'face',
        notes: 'Khám tổng quát',
        completed: false,
    });

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
                    styles: "cancel",
                },
                {
                    text: "Hủy",
                    onPress: () => {
                        navigation.goBack();
                    }
                },
            ]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={goBack} style={styles.backButton}>
                    <Icon name='arrow-back' size={24} color="#b0b0b0" />
                </TouchableOpacity>
                <Text style={styles.title}>Appointment Detail</Text>
            </View>
            <View style={styles.card}>
                <View>
                    <View style={styles.row}>
                        <Text style={styles.labeltext}>
                            <Text style={styles.patientName}>{appointment.patient}</Text>
                        </Text>
                        {!appointment.completed && (
                            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                                <Icon name="pencil" size={15} color="#ffffff" />
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.row}>
                        <Text style={styles.label}>Thời gian:</Text>
                        <Text style={styles.value}>{new Date(appointment.time).toLocaleTimeString()}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Dịch vụ:</Text>
                        <Text style={styles.value}>{appointment.service.charAt(0).toUpperCase() + appointment.service.slice(1)}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Ghi chú:</Text>
                        <Text style={styles.value}>{appointment.notes}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Trạng thái:</Text>
                        <Text style={styles.value}>{appointment.completed ? 'Hoàn thành' : 'Chưa hoàn thành'}</Text>
                    </View>
                    {!appointment.completed && (
                        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                            <Text style={styles.deleteButtonText}>Cancel Appointment</Text>
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
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                        >
                            <View style={styles.modalheader}>
                                <TouchableOpacity onPress={() => setIsUpdating(false)}>
                                    <Icon name='arrow-back' size={24} color="#b0b0b0" />
                                </TouchableOpacity>
                                <Text style={styles.modalTitle}>Update Appointment</Text>
                            </View>
                            <TextInput
                                style={styles.input}
                                value={appointment.patient}
                                onChange={(text) => setAppointment({ ...appointment, patient: text })}
                            />
                            <TextInput
                                style={styles.input}
                                value={new Date(appointment.time).toLocaleDateString()}
                                onChange={(text) => setAppointment({ ...appointment, time: text })}
                            />
                            <TextInput
                                style={styles.input}
                                value={appointment.service}
                                onChange={(text) => setAppointment({ ...appointment, service: text })}
                            />
                            <TextInput
                                style={styles.input}
                                value={appointment.text}
                                onChange={(text) => setAppointment({ ...appointment, notes: text })}
                            />
                            <TextInput
                                style={styles.input}
                                value={appointment.text}
                                onChange={(text) => setAppointment({ ...appointment, notes: text })}
                            />
                            <TextInput
                                style={styles.input}
                                value={appointment.text}
                                onChange={(text) => setAppointment({ ...appointment, notes: text })}
                            />
                            <TextInput
                                style={styles.input}
                                value={appointment.text}
                                onChange={(text) => setAppointment({ ...appointment, notes: text })}
                            />
                            <TextInput
                                style={styles.input}
                                value={appointment.text}
                                onChange={(text) => setAppointment({ ...appointment, notes: text })}
                            />
                            <View style={styles.modalButtonContainer}>
                                <TouchableOpacity
                                    style={[styles.saveButton]}
                                    onPress={handleSave}
                                >
                                    <Text style={styles.saveButtonText}>Save</Text>
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
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContentdelete}>
                            <View style={styles.modalheaderdelete}>
                                <Text style={styles.modalTitledelete}>Delete Appointment</Text>
                            </View>
                            <Text style={styles.deleteMessage}>Are you sure you want to delete this appointment?</Text>
                            <View style={styles.modalButtondelete}>
                                <TouchableOpacity style={styles.deleteButton} onPress={confirmDelete}>
                                    <Text style={styles.deleteButtonText}>Delete</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.deleteButton} onPress={() => setIsDeleting(false)}>
                                    <Text style={styles.deleteButtonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontSize: 14,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 40,
        marginBottom: 10,
        backgroundColor: '#5C9161',
    },
    backButton: {
        marginLeft: 10,
    },
    backButtonText: {
        fontSize: 16,
        marginLeft: 5,
    },
    title: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 20,
    },
    detailContainer: {
        marginBottom: 10,
    },
    card: {
        backgroundColor: '#fff',
        padding: 15,
        margin: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#A4DAA9',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // Đổ bóng trên Android
    },
    label: {
        flex: 1,
        marginBottom: 10,
    },
    labeltext: {
        flex: 1,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 0,
    },
    value: {
        flex: 1,
        marginBottom: 10,
    },
    patientName: {
        fontWeight: 'bold',
    },
    //dấu gạch dưới của tên bệnh nhân
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#A4DAA9',
        marginVertical: 10,
        width: 260,
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center', // Căn giữa nội dung
        alignItems: 'center', // Căn giữa theo trục dọc
        marginBottom: 5,
    },
    // nút edit
    editButton: {
        position: 'absolute',
        right: 0,
        top: 18, // Điều chỉnh khoảng cách nếu cần
        backgroundColor: '#5C9161',
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    editButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    input: {
        borderColor: '#A4DAA9',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#fff',
        width: '100%',
    },
    // form delete
    deleteMessage: {
        fontSize: 16,
        marginVertical: 10,
        textAlign: 'center',
    },

    cancelButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#ccc',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },

    cancelButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    deleteButton: {
        marginTop: 10,
        backgroundColor: '#5C9161',
        padding: 10,
        borderRadius: 10,
        marginRight: 5,
    },
    deleteButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalheaderdelete: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalContainerdelete: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContentdelete: {
        width: 300,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitledelete: {
        color: '#A4DAA9',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    modalButtondelete: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginTop: 10,
    },
    //form update 
    modalheader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        marginTop: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        height: 550,
        width: 300,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'flex-start',
        overflow: 'hidden',
    },
    modalTitle: {
        color: '#A4DAA9',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 25,
        marginTop: 10,
        marginBottom: 10,
    },
    saveButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#5C9161',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default AppointmentDetail;
