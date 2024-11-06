import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles } from "./styles";
import Icon from 'react-native-vector-icons/Ionicons';
import Logo from "../../assets/images/logo2.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from '../../LocalIP/localIP';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';

const Appointment = () => {
  const navigation = useNavigation();
  const [appointments, setAppointments] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [statusFilter, setStatusFilter] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('Booked');

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    // Filter appointments based on status
    const filtered = appointments.filter(appointment =>
      (statusFilter && appointment.status === 'Canceled') ||
      (!statusFilter && appointment.status === 'Booked' || appointment.status === 'Pending')
    );
    setFilteredData(filtered);
  }, [appointments, statusFilter]);

  const fetchAppointments = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const userdata = await AsyncStorage.getItem('userdata');
      const parsedUserdata = JSON.parse(userdata); // Parse userdata JSON
      const customerId = parsedUserdata.data.customerId; // Access customerId
      const customerResponse = await fetch(`${API_BASE_URL}/customer/${customerId}`);
      const datacustomer = await customerResponse.json();
      const fullName = datacustomer.data.fullName; // Extract fullName from the response
      const response = await fetch(`${API_BASE_URL}/appointments`);
      const data = await response.json();
      // Filter by userId
      const filteredAppointments = data.data.filter(appointment => appointment.user === userId);
      // Fetch services for appointments
      const appointmentsWithServices = await Promise.all(filteredAppointments.map(async (appointment) => {
        const serviceNames = await Promise.all(appointment.services.map(async (serviceId) => {
          const serviceData = await fetchServiceById(serviceId);
          return serviceData ? serviceData.data.name : 'Unknown service';
        }));
        return {
          ...appointment,
          fullName,
          services: serviceNames,
        };
      }));

      setAppointments(appointmentsWithServices);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchServiceById = async (serviceId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/services/${serviceId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching service with ID ${serviceId}:`, error);
      return null;
    }
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setSelectedStatus(status ? 'Canceled' : 'Booked');
  };
  const goBack = () => {
    router.push('hometab/hometab');
  };
  const renderScheduleItem = ({ item }) => (
    <View style={styles.scheduleItem}>
      <View style={styles.infoRow}>
        <Text style={styles.labelText}>FullName:</Text>
        <Text style={styles.valueText}>{item.fullName}</Text>
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
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
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
          {selectedStatus === 'Booked' && <View style={styles.underline} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.statusButton, statusFilter && styles.selectedStatusButton]}
          onPress={() => handleStatusFilter(true)}
        >
          <Text style={styles.statusText}>Canceled</Text>
          {selectedStatus === 'Canceled' && <View style={styles.underline} />}
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
