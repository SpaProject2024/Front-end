import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from "./styles";
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from '../../LocalIP/localIP';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';

const Appointment = () => {
    const navigation = useNavigation();
    const [appointments, setAppointments] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [statusFilter, setStatusFilter] = useState(false); // false = Booked, true = Canceled
    const [selectedStatus, setSelectedStatus] = useState('Booked');

    useEffect(() => {
        fetchAppointments();
    }, []);

    useEffect(() => {
        const filtered = appointments.filter(appointment =>
            (statusFilter && appointment.status === 'Canceled') ||
            (!statusFilter && (appointment.status === 'Booked' || appointment.status === 'Pending'))
        );
        setFilteredData(filtered);
    }, [appointments, statusFilter]);

    const fetchAppointments = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/appointments`);
            const data = await response.json();
            setAppointments(data.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const updateStatus = async (appointmentId, newStatus) => {
        try {
            const response = await fetch(`${API_BASE_URL}/appointments/${appointmentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });
            const result = await response.json();
            if (result.success) {
                Alert.alert('Success', 'Status updated successfully.');
                fetchAppointments(); // Reload appointments after updating
            } else {
                Alert.alert('Error', 'Failed to update status.');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            Alert.alert('Error', 'Failed to update status.');
        }
    };

    const handleStatusFilter = (status) => {
        setStatusFilter(status);
        setSelectedStatus(status ? 'Canceled' : 'Booked');
    };

    const renderScheduleItem = ({ item }) => (
        <View style={styles.scheduleItem}>
            <View style={styles.infoRow}>
                <Text style={styles.labelText}>Patient:</Text>
                <Text style={styles.valueText}>{item.patientName}</Text>
            </View>
            <View style={styles.infoRow}>
                <Text style={styles.labelText}>Service:</Text>
                <Text style={styles.valueText}>{item.services.join(', ')}</Text>
            </View>
            <View style={styles.infoRow}>
                <Text style={styles.labelText}>Slot:</Text>
                <Text style={styles.valueText}>{item.slot}</Text>
            </View>
            <View style={styles.infoRow}>
                <Text style={styles.labelText}>Status:</Text>
                <Text style={styles.valueText}>{item.status}</Text>
            </View>
            {item.status === 'Pending' && (
                <TouchableOpacity
                    style={styles.updateButton}
                    onPress={() => updateStatus(item._id, 'Booked')}
                >
                    <Text style={styles.updateButtonText}>Confirm Booking</Text>
                </TouchableOpacity>
            )}
            {item.status === 'Booked' && (
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => updateStatus(item._id, 'Canceled')}
                >
                    <Text style={styles.cancelButtonText}>Cancel Appointment</Text>
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('hometab/hometab')} style={styles.backButton}>
                    <Icon name='arrow-back' size={24} color="#b0b0b0" />
                </TouchableOpacity>
                <Text style={styles.title}>Appointment History</Text>
            </View>

            {/* Status filter */}
            <View style={styles.statusFilterContainer}>
                <TouchableOpacity
                    style={[styles.statusButton, !statusFilter && styles.selectedStatusButton]}
                    onPress={() => handleStatusFilter(false)}
                >
                    <Text style={styles.statusText}>Booked</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.statusButton, statusFilter && styles.selectedStatusButton]}
                    onPress={() => handleStatusFilter(true)}
                >
                    <Text style={styles.statusText}>Canceled</Text>
                </TouchableOpacity>
            </View>

            {filteredData.length === 0 ? (
                <View style={{ backgroundColor: '#fff', height: 400, alignItems: 'center' }}>
                    <Text>No appointments available</Text>
                </View>
            ) : (
                <FlatList
                    style={styles.containercard}
                    data={filteredData}
                    renderItem={renderScheduleItem}
                    keyExtractor={(item) => item._id}
                />
            )}
        </View>
    );
};

export default Appointment;
