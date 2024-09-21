import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AppointmentDetail({ route }) {
    const { id } = route.params;

    // Tìm kiếm dữ liệu theo id (có thể lấy từ state, hoặc gọi API để lấy chi tiết)
    const appointment = scheduleData.find(item => item.id === id);

    return (
        <View style={styles.container}>
            {appointment ? (
                <>
                    <Text style={styles.title}>Appointment Details</Text>
                    <Text style={styles.label}>Patient: {appointment.patient}</Text>
                    <Text style={styles.label}>Service: {appointment.service}</Text>
                    <Text style={styles.label}>Date: {appointment.time}</Text>
                    <Text style={styles.label}>Notes: {appointment.notes}</Text>
                    <Text style={styles.label}>Completed: {appointment.completed ? 'Yes' : 'No'}</Text>
                </>
            ) : (
                <Text>Appointment not found</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 18,
        marginVertical: 5,
    },
});
