import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from "expo-router";

export default function ScheduleScreen() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [serviceId, setServiceId] = useState(null);
  const navigation = useNavigation();
  const router = useRouter();

  const timeSlots = [
    "8:00AM", "9:00AM", "10:00AM", "11:00AM",
    "13:00PM", "14:00PM", "15:00PM", "16:00PM", "17:00PM",
  ];

  useEffect(() => {
    const fetchSelections = async () => {
      try {
        const savedDate = await AsyncStorage.getItem("selectedDate");
        const savedSlot = await AsyncStorage.getItem("selectedSlot");
        const id = await AsyncStorage.getItem("serviceIds");
        if (savedDate) setSelectedDate(savedDate);
        if (savedSlot) setSelectedSlot(savedSlot);
        if (id) setServiceId(id);
      } catch (error) {
        console.error("Error fetching saved selections:", error);
      }
    };
    fetchSelections();
  }, []);

  const onDateSelect = async (day) => {
    setSelectedDate(day.dateString);
    try {
      await AsyncStorage.setItem("selectedDate", day.dateString);
    } catch (error) {
      console.error("Error saving selected date:", error);
    }
  };

  const onSlotSelect = async (slot) => {
    setSelectedSlot(slot);
    try {
      await AsyncStorage.setItem("selectedSlot", slot);
    } catch (error) {
      console.error("Error saving selected slot:", error);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const renderTimeSlots = () => {
    return timeSlots.map((slot, index) => (
      <TouchableOpacity
        key={index}
        style={[styles.slot, selectedSlot === slot && styles.selectedSlot]}
        onPress={() => onSlotSelect(slot)}
      >
        <Text style={selectedSlot === slot ? styles.selectedSlotText : styles.slotText}>{slot}</Text>
      </TouchableOpacity>
    ));
  };

  const handleContinue = async () => {
    try {
      // Lưu thông tin vào AsyncStorage
      await AsyncStorage.setItem("selectedServiceId", serviceId);
      await AsyncStorage.setItem("selectedDate", selectedDate);
      await AsyncStorage.setItem("selectedSlot", selectedSlot);
      // Navigate to DoctorSelectionScreen
      router.push("/choosedoctor/choosedoctor");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Icon name='arrow-back' size={24} color="#b0b0b0" />
        </TouchableOpacity>
        <Text style={styles.title}>Schedule</Text>
      </View>
      <ScrollView style={styles.date}>
        <Text style={styles.sectionTitle}>Select date</Text>
        <Calendar
          onDayPress={onDateSelect}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: "#5C9161" },
          }}
          theme={{
            arrowColor: "#5C9161",
            selectedDayBackgroundColor: "#5C9161",
            todayTextColor: "#5C9161",
            textDayFontWeight: "bold",
          }}
          style={styles.calendar}
        />

        <Text style={styles.sectionTitle}>Available slot</Text>
        <ScrollView contentContainerStyle={styles.slotContainer}>
          {renderTimeSlots()}
        </ScrollView>

        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>CONTINUE</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  date: {
    padding: 20,
  },
  backButton: {
    marginRight: 20,
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: '#5C9161',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  calendar: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    transform: [{ scaleX: 1.2 }, { scaleY: 1 }],
    alignSelf: "center",
  },
  slotContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  slot: {
    width: "48%",
    padding: 15,
    backgroundColor: "#A4D8A8",
    borderRadius: 8,
    marginVertical: 5,
    alignItems: "center",
  },
  selectedSlot: {
    backgroundColor: "#5C9161",
  },
  slotText: {
    color: "#000000",
  },
  selectedSlotText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  continueButton: {
    backgroundColor: "#5C9161",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
