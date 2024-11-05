import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Image, Button, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { styles, buttonStyles } from "./styles";
import Logo from "../../assets/images/logo2.png";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import Bell from "../../assets/images/bell.png";
import { Dropdown } from "react-native-element-dropdown";
import { useRouter } from "expo-router";
import { API_BASE_URL } from '../../LocalIP/localIP';
import AsyncStorage from "@react-native-async-storage/async-storage";
const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const items = [
    { label: 'suppliermanager', value: 'suppliermanager' },
    { label: 'Send Appointment', value: 'sendappointment' },
];

export default function Appointment() {
    const router = useRouter();
    const [appointments, setAppointments] = useState([]); // State to hold appointment data
    const [filteredData, setFilteredData] = useState([]); // Filtered appointments
    const [weekOffset, setWeekOffset] = useState(0);
    const [selectedDate, setSelectedDate] = useState(null);
    const [statusFilter, setStatusFilter] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('incomplete');
    const [value, setValue] = useState(null);
    const navigation = useNavigation();

    // Fetch appointment data from API
    useEffect(() => {
        fetchAppointments();
    }, []);

    // Function to fetch data from API
    const fetchAppointments = async () => {
        try {
            const doctorId = await AsyncStorage.getItem('doctorId'); // Lấy doctorId từ AsyncStorage
            const response = await fetch(`${API_BASE_URL}/appointments`);
            const data = await response.json();
            //thanh lọc
            const filteredAppointments = data.data.filter((appointment) => appointment.doctor === doctorId);
            //dịch vụ 
            const appointmentsWithServices = await Promise.all(filteredAppointments.map(async (appointment) => {
                const serviceNames = await Promise.all(appointment.services.map(async (serviceId) => {
                    const serviceData = await fetchServiceById(serviceId);
                    return serviceData ? serviceData.data.name : 'Unknown service'; // Lấy tên từ serviceData.data
                }));
                return {
                    ...appointment,
                    services: serviceNames,
                };
            }));
            console.log('doctor', doctorId);
            setAppointments(appointmentsWithServices); // Assuming your data is inside `data.data`
            filterByDate(new Date(), statusFilter);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };
    const fetchServiceById = async (serviceId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/services/${serviceId}`);
            const data = await response.json();
            return data; // Giả sử bạn nhận được thông tin dịch vụ với trường `name`
        } catch (error) {
            console.error(`Error fetching service with ID ${serviceId}:`, error);
            return null; // Trả về null nếu có lỗi
        }
    };

    // Get week dates
    const getWeekDates = () => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + weekOffset * 7);
        const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1));
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const day = new Date(startOfWeek);
            day.setDate(startOfWeek.getDate() + i);
            dates.push(day);
        }
        return dates;
    };

    // Filter appointments by selected date and status
    const filterByDate = (date, status) => {
        let filtered = appointments;
        if (date) {
            filtered = filtered.filter((item) => {
                const itemDate = new Date(item.appointmentDate);
                return (
                    itemDate.getDate() === date.getDate() &&
                    itemDate.getMonth() === date.getMonth() &&
                    itemDate.getFullYear() === date.getFullYear()
                );
            });
        }
        if (status !== null) {
            filtered = filtered.filter((item) => item.status === (status ? 'Canceled' : 'Booked')); // Cập nhật logic lọc
        }
        setFilteredData(filtered);
    };

    const handleDatePress = (date) => {
        setSelectedDate(date);
        filterByDate(date, statusFilter);
    };

    const handleStatusFilter = (status) => {
        setStatusFilter(status);
        setSelectedStatus(status ? 'Canceled' : 'Booked'); // Thay đổi trạng thái thành "cancel" và "booked"
        filterByDate(selectedDate, status);
    };

    const renderScheduleItem = ({ item }) => {
        return (
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
                <View style={styles.infoRow}>
                    <Text style={styles.labelText}>Patient Details:</Text>
                    <TouchableOpacity
                        style={styles.viewDetailsButton}
                        onPress={() => {
                            router.push({
                                pathname: 'appointmentdetail/appointmentdetail',
                                params: { appointmentID: item._id }, // Truyền ID qua params
                            });
                        }}
                    >
                        <Text style={styles.buttonText}>View</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
    //comment
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={Logo} style={styles.logo} />
                <Text style={styles.title}>Appointment </Text>
                <View style={styles.dropdownmenu}>
                    <TouchableOpacity onPress={() => router.push("")}>
                        <Image source={Bell} style={styles.bell} />
                    </TouchableOpacity>
                    <View style={styles.dropdownWrappers}>
                        <Dropdown
                            style={styles.dropdowns}
                            inputSearchStyle={{ display: "none" }}
                            iconStyle={styles.iconStyles}
                            data={items}
                            search={false}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder=""
                            value={value}
                            renderLeftIcon={() => (
                                <Icon name="bars" size={20} color="black" />
                            )}
                            onChange={(item) => {
                                setValue(item.value);
                                if (item.value === "sendappointment") {
                                    router.push("/Sendappointment/sendappointment");
                                } else if (item.value === "suppliermanager") {
                                    router.push("/suppliermanager/suppliermanager");
                                }
                            }}
                        />
                    </View>
                </View>
            </View>

            {/* Week navigation */}
            <View style={styles.Containerall}>
                <View style={styles.weekContainer}>
                    <TouchableOpacity onPress={() => setWeekOffset(weekOffset - 1)}>
                        <Text style={styles.weekNavButton}>{'<'}</Text>
                    </TouchableOpacity>
                    {getWeekDates().map((date, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.dayContainer}
                            onPress={() => handleDatePress(date)}
                        >
                            <Text
                                style={[
                                    styles.dayText,
                                    selectedDate?.toDateString() === date.toDateString() && styles.selectedDayText
                                ]}
                            >
                                {weekDays[index]}
                            </Text>
                            <Text
                                style={[
                                    styles.dateText,
                                    selectedDate?.toDateString() === date.toDateString() && styles.selectedDateText
                                ]}
                            >
                                {date.getDate()}
                            </Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity onPress={() => setWeekOffset(weekOffset + 1)}>
                        <Text style={styles.weekNavButton}>{'>'}</Text>
                    </TouchableOpacity>
                </View>

                {/* Status filter */}
                <View style={styles.statusFilterContainer}>
                    <TouchableOpacity
                        style={[
                            styles.statusButton,
                            statusFilter === false && styles.selectedStatusButton
                        ]}
                        onPress={() => handleStatusFilter(false)}
                    >
                        <Text style={styles.statusText}>Booked</Text>
                        {selectedStatus === 'Booked' && <View style={styles.underline} />}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.statusButton,
                            statusFilter === true && styles.selectedStatusButton
                        ]}
                        onPress={() => handleStatusFilter(true)}
                    >
                        <Text style={styles.statusText}>Cancel</Text>
                        {selectedStatus === 'Canceled' && <View style={styles.underline} />}
                    </TouchableOpacity>
                </View>

                {filteredData.length === 0 ? (
                    <View style={{ backgroundColor: '#fff', height: 400, alignItems: 'center', }}>
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
        </View>
    );
}
