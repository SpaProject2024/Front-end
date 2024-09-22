import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
const BookingDetailScreen = () => {
   
    const booking = {
        imageUri: 'https://kientruchoanmy.vn/wp-content/uploads/2022/11/43e259149754607.62ecf7cdf25c8-min.jpg',
        name: 'John Doe',
        address: '123 Main St, Springfield',
        date: '2024-09-25',
        time: '10:00 AM',
        phone: '123-456-7890',
        specialistTitle: 'Specialist',
        specialistName: 'Dr. Smith',
        services: [
            { name: 'Service 1', price: '$100' },
            { name: 'Service 2', price: '$150' },
            { name: 'Service 3', price: '$200' }
        ],
        totalPay: '$450', 
    };


    return (
        <ScrollView style={styles.container}>
            
            <View style={styles.header}>
                <Image source={{ uri: booking.imageUri }} style={styles.avatar} />
                <View style={styles.info}>
                    <Text style={styles.name}>{booking.name}</Text>
                    <Text style={styles.address}>{booking.address}</Text>
                </View>
            </View>

           
            <View style={styles.detailsRow}>
                <View style={styles.detailItem}>
                    <Icon name="calendar" size={20} color="#2B5F2F" />
                    <Text style={styles.label}>Date</Text>
                    <Text>{booking.date}</Text>
                </View>
                <View style={[styles.detailItem, styles.detailItemMiddle]}>
                    <Icon name="clock-o" size={20} color="#2B5F2F" />
                    <Text style={styles.label}>Time</Text>
                    <Text>{booking.time}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Icon name="phone" size={20} color="#2B5F2F" />
                    <Text style={styles.label}>Phone</Text>
                    <Text>{booking.phone}</Text>
                </View>
            </View>

         
            <View style={styles.specialistSection}>
                <Text style={styles.sectionTitle}>Specialist</Text>
                <Text style={styles.sectionName}>{booking.specialistName}</Text>
            </View>

           
            <View style={styles.servicesSection}>
                {booking.services.map((service, index) => (
                    <View key={index} style={styles.serviceItem}>
                        <Text>{service.name}</Text>
                        <Text>{service.price}</Text>
                    </View>
                ))}
                <View style={styles.totalPayContainer}>
                    <Text style={styles.totalPayLabel}>Total Payment</Text>
                    <Text style={styles.totalPayAmount}>{booking.totalPay}</Text>
                </View>
            </View>

          
            <View style={styles.buttonWrapper}>
                <TouchableOpacity style={styles.addReviewButton} >
                    <Text style={styles.addReviewButtonText}>Get Rate</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        marginTop: 10,
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    avatar: {
        width: 80,
        height: 80,
        marginRight: 16,
        borderRadius: 5,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    address: {
        fontSize: 16,
        color: '#8a8d8e',
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    detailItem: {
        flex: 1,
        alignItems: 'center',
    },
    detailItemMiddle: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#ddd',
        flex: 1,
        alignItems: 'center',
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 4,
    },
    specialistSection: {
        marginBottom: 16,
        paddingBottom: 16,
        borderBottomWidth: 2,
        borderStyle: 'dashed',
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8,
        backgroundColor: '#758e76',
        padding: 5,
    },
    sectionName: {
        paddingLeft: 10,
    },
    servicesSection: {
        marginBottom: 16,
    },
    serviceItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    totalPayContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        marginTop: 10,
    },
    totalPayLabel: {
        fontWeight: 'bold',
    },
    totalPayAmount: {
        fontWeight: 'bold',
    },
    buttonWrapper: {
        padding: 10,
    },
    addReviewButton: {
        backgroundColor: '#2B5F2F',
        borderRadius: 10,
    },
    addReviewButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
        padding: 5,
    },
});

export default BookingDetailScreen;
