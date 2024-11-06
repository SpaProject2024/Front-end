import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Button, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Đã cập nhật import
import { useNavigation } from '@react-navigation/native'; // Thêm import này
import { Ionicons } from '@expo/vector-icons';

const WorkScheduleCard = ({ schedule, onView }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.scheduleInfo}>Doctor ID: {schedule.doctorID}</Text>
      <Text style={styles.scheduleInfo}>Date: {schedule.date_of_week}</Text>
      <Text style={styles.scheduleInfo}>Time: {schedule.start_time} - {schedule.end_time}</Text>
      <Text style={styles.scheduleInfo}>Status: {schedule.status}</Text>
      <TouchableOpacity onPress={() => onView(schedule)} style={styles.viewButton}>
        <Text style={styles.viewButtonText}>View</Text>
      </TouchableOpacity>
    </View>
  );
};

const ManageWorkScheduleScreen = () => {
  const navigation = useNavigation(); // Khai báo navigation
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    date_of_week: '',
    doctorID: '',
    start_time: '',
    end_time: '',
    status: 'Available',
  });
  const [updatedSchedule, setUpdatedSchedule] = useState(null);

  useEffect(() => {
    const initialSchedules = [
      {
        workID: '1',
        doctorID: 'D001',
        date_of_week: 'Monday',
        start_time: '09:00',
        end_time: '12:00',
        status: 'Available',
      },
      {
        workID: '2',
        doctorID: 'D002',
        date_of_week: 'Tuesday',
        start_time: '10:00',
        end_time: '13:00',
        status: 'Unavailable',
      },
      {
        workID: '3',
        doctorID: 'D003',
        date_of_week: 'Wednesday',
        start_time: '08:00',
        end_time: '11:00',
        status: 'Available',
      },
    ];

    setSchedules(initialSchedules);
    setLoading(false);
  }, []);

  const handleViewSchedule = (schedule) => {
    setSelectedSchedule(schedule);
  };

  const handleAddSchedule = () => {
    const newWorkID = (schedules.length + 1).toString();
    const scheduleToAdd = { ...newSchedule, workID: newWorkID };
    setSchedules([...schedules, scheduleToAdd]);
    setCreateModalVisible(false);
    setNewSchedule({ date_of_week: '', doctorID: '', start_time: '', end_time: '', status: 'Available' });
  };

  const handleUpdateSchedule = () => {
    const updatedSchedules = schedules.map(schedule =>
      schedule.workID === updatedSchedule.workID ? updatedSchedule : schedule
    );
    setSchedules(updatedSchedules);
    setUpdateModalVisible(false);
    setUpdatedSchedule(null);
  };

  const renderItem = ({ item }) => <WorkScheduleCard schedule={item} onView={handleViewSchedule} />;

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Work Schedules</Text>
        <TouchableOpacity style={styles.createButton} onPress={() => setCreateModalVisible(true)}>
          <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={schedules}
        renderItem={renderItem}
        keyExtractor={(item) => item.workID}
        contentContainerStyle={styles.list}
      />

      {/* Modal thêm lịch làm việc */}
      <Modal
        visible={createModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setCreateModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Date of Week"
              value={newSchedule.date_of_week}
              onChangeText={(text) => setNewSchedule({ ...newSchedule, date_of_week: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Doctor ID"
              value={newSchedule.doctorID}
              onChangeText={(text) => setNewSchedule({ ...newSchedule, doctorID: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Start Time"
              value={newSchedule.start_time}
              onChangeText={(text) => setNewSchedule({ ...newSchedule, start_time: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="End Time"
              value={newSchedule.end_time}
              onChangeText={(text) => setNewSchedule({ ...newSchedule, end_time: text })}
              style={styles.input}
            />
            <Picker
              selectedValue={newSchedule.status}
              onValueChange={(itemValue) => setNewSchedule({ ...newSchedule, status: itemValue })}
              style={styles.input}
            >
              <Picker.Item label="Available" value="Available" />
              <Picker.Item label="Unavailable" value="Unavailable" />
            </Picker>
            <View style={styles.buttonContainer}>
              <Button title="Add Schedule" onPress={handleAddSchedule} color="#28a745" />
              <Button title="Close" onPress={() => setCreateModalVisible(false)} color="#dc3545" />
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal chi tiết lịch làm việc */}
      <Modal
        visible={selectedSchedule !== null}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedSchedule(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedSchedule && (
              <>
                <Text style={styles.detailName}>Doctor ID: {selectedSchedule.doctorID}</Text>
                <Text style={styles.detailInfo}>Date: {selectedSchedule.date_of_week}</Text>
                <Text style={styles.detailInfo}>Time: {selectedSchedule.start_time} - {selectedSchedule.end_time}</Text>
                <Text style={styles.detailInfo}>Status: {selectedSchedule.status}</Text>
                <View style={styles.buttonContainer}>
                  <Button title="Update" onPress={() => {
                    setUpdatedSchedule(selectedSchedule);
                    setUpdateModalVisible(true);
                  }} color="#007bff" />
                  <Button title="Close" onPress={() => setSelectedSchedule(null)} color="#dc3545" />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Modal cập nhật lịch làm việc */}
      <Modal
        visible={updateModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setUpdateModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {updatedSchedule && (
              <>
                <TextInput
                  placeholder="Date of Week"
                  value={updatedSchedule.date_of_week}
                  onChangeText={(text) => setUpdatedSchedule({ ...updatedSchedule, date_of_week: text })}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Doctor ID"
                  value={updatedSchedule.doctorID}
                  onChangeText={(text) => setUpdatedSchedule({ ...updatedSchedule, doctorID: text })}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Start Time"
                  value={updatedSchedule.start_time}
                  onChangeText={(text) => setUpdatedSchedule({ ...updatedSchedule, start_time: text })}
                  style={styles.input}
                />
                <TextInput
                  placeholder="End Time"
                  value={updatedSchedule.end_time}
                  onChangeText={(text) => setUpdatedSchedule({ ...updatedSchedule, end_time: text })}
                  style={styles.input}
                />
                <Picker
                  selectedValue={updatedSchedule.status}
                  onValueChange={(itemValue) => setUpdatedSchedule({ ...updatedSchedule, status: itemValue })}
                  style={styles.input}
                >
                  <Picker.Item label="Available" value="Available" />
                  <Picker.Item label="Unavailable" value="Unavailable" />
                </Picker>
                <View style={styles.buttonContainer}>
                  <Button title="Update Schedule" onPress={handleUpdateSchedule} color="#28a745" />
                  <Button title="Close" onPress={() => setUpdateModalVisible(false)} color="#dc3545" />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: '#DDDDDD',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginRight: 5,
  },
 
  backButtonText: {
    color: '#fff',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  createButton: {
    padding: 8,
    backgroundColor: '#28a745',
    borderRadius: 5,
  },
  createButtonText: {
    color: '#fff',
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
  },
  scheduleInfo: {
    fontSize: 16,
    marginBottom: 4,
  },
  viewButton: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  viewButtonText: {
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
  },
  detailName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detailInfo: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ManageWorkScheduleScreen;