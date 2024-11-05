import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '../../app/Home/[home]';
import HistoryScreen from '../../app/History/[history]';
import ServicesScreen from '../../app/ServiceList/[servicelist]';
import ProfileScreen from '../../app/MyAccount/[myAccount]';
import AcceptAppointmentScreen from '../../app/acceptappointment/[acceptappointment]'; // Import the Accept Appointment screen

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
    const [role, setRole] = useState(null);

    useEffect(() => {
        const getUserRole = async () => {
            try {
                const userdata = await AsyncStorage.getItem('userrole');
                console.log("User data:", userdata); // Log the retrieved data
                const parsedData = userdata ? JSON.parse(userdata) : null;
                if (parsedData && parsedData.role) {
                    setRole(parsedData.role);
                } else {
                    console.log("No role found in userdata");
                }
            } catch (error) {
                console.error("Failed to retrieve user data:", error);
            }
        };
        getUserRole();
    }, []);


    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'History') {
                        iconName = focused ? 'time' : 'time-outline';
                    } else if (route.name === 'Services') {
                        iconName = focused ? 'list' : 'list-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    } else if (route.name === 'Accept Appointment') {
                        iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'green',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Services" component={ServicesScreen} options={{ headerShown: false }} />
            <Tab.Screen name="History" component={HistoryScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
            {role === 'staff' && (
                <Tab.Screen name="Accept Appointment" component={AcceptAppointmentScreen} options={{ headerShown: false }} />
            )}
        </Tab.Navigator>
    );
}
