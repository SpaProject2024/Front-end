import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { useRouter } from 'expo-router';


const Dashboard = ({ navigation }) => {
    const router = useRouter();
    return (
        <View style={styles.container}>
            <Text style={styles.cardTitle}>Visitors Stats</Text>
            <View style={styles.card}>
            </View>
            <Text style={styles.cardTitle}>Details of the managers</Text>
            <View style={styles.card}>
                <Card.Content>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => router.push('/WareHouse/warehouse.jsx')}
                    >
                        <Text style={styles.buttonText}>Product</Text>
                    </TouchableOpacity>

                    <View style={styles.separator} />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => router.push('/suppliermanager/suppliermanager')}
                    >
                        <Text style={styles.buttonText}>Supplier</Text>
                    </TouchableOpacity>
                    <View style={styles.separator} />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => router.push('/categoriesmanager/categoriesmanager')}
                    >
                        <Text style={styles.buttonText}>Categories</Text>
                    </TouchableOpacity>

                    <View style={styles.separator} />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => router.push('/servicesmanager/servicesmanager')}
                    >
                        <Text style={styles.buttonText}>Services</Text>
                    </TouchableOpacity>

                    <View style={styles.separator} />
                    <TouchableOpacity
                        onPress={() => router.push('/Warehouse/warehouse')}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>WareHouse</Text>
                    </TouchableOpacity>

                    <View style={styles.separator} />
                    <TouchableOpacity
                        onPress={() => router.push('/doctormanager/dotormanager')}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Doctor Manager</Text>
                    </TouchableOpacity>

                    <View style={styles.separator} />
                    <TouchableOpacity
                        onPress={() => router.push('/customermanager/customermanager')}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Customer Manager</Text>
                    </TouchableOpacity>

                    <View style={styles.separator} />
                    <TouchableOpacity
                        onPress={() => router.push('/staffmanager/staffmanager')}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Staff Manager</Text>
                    </TouchableOpacity>

                    <View style={styles.separator} />
                    <TouchableOpacity
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Services</Text>
                    </TouchableOpacity>

                    <View style={styles.separator} />
                    <TouchableOpacity
                        style={styles.button}
                    >

                        <Text style={styles.buttonText}>................</Text>
                    </TouchableOpacity>
                </Card.Content>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f8f8',
    },
    userInfo: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    userDetails: {
        textAlign: 'center',
        marginTop: 8,
        color: '#777',
    },

    card: {
        backgroundColor: '#ffffff',
        padding: 16,
        marginBottom: 12,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderBottomWidth: 3,
        borderRightWidth: 3,
        borderColor: '#000',
    },
    cardTitle: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',

    },
    buttonText: {
        marginLeft: 10,
        fontSize: 16,
    },
    icon: {
        width: 40,
        height: 40,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 10,
    },
});

export default Dashboard;