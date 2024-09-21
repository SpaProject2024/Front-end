import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Home/home';
import Appointment from './schedule';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
const Tab = createBottomTabNavigator();

export default function Layout() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Appointment"
                component={Appointment}
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'calendar' : 'calendar-outline'} color={color} />
                    ),
                }}
            />
            {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
        </Tab.Navigator>
    );
}
