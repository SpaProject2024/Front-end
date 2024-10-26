import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Modal, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from '../../LocalIP/localIP';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const Warehouse = () => {
  const [warehouseData, setWarehouseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [newWarehouse, setNewWarehouse] = useState({ name: '', location: '', capacity: '' });

  const navigation = useNavigation();

  const fetchWarehouseData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/warehouse/list`);
      setWarehouseData(response.data);
    } catch (error) {
      console.error('Error fetching warehouse data:', error);
      setError('Unable to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWarehouseData();
  }, []);

  const openViewModal = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setNewWarehouse({ name: warehouse.name, location: warehouse.location, capacity: warehouse.capacity });
    setModalVisible(true);
  };

  const openEditModal = () => {
    if (selectedWarehouse) {
      setNewWarehouse({
        name: selectedWarehouse.name,
        location: selectedWarehouse.location,
        capacity: selectedWarehouse.capacity,
      });
      setEditModalVisible(true);
      setModalVisible(false);
    } else {
      Alert.alert('Error', 'No warehouse selected for editing.');
    }
  };

  const openCreateModal = () => {
    setNewWarehouse({ name: '', location: '', capacity: '' });
    setCreateModalVisible(true);
  };

  const createWarehouse = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/warehouse/add`, newWarehouse);
      Alert.alert('Success', 'Warehouse created successfully.');
      fetchWarehouseData();
      setCreateModalVisible(false);
    } catch (error) {
      console.error('Error creating warehouse:', error);
      Alert.alert('Error', 'Could not create warehouse.');
    }
  };


  const updateWarehouse = async () => {
    try {
      const response = await axios.put(`${API_BASE_URL}/warehouse/update/${selectedWarehouse._id}`, newWarehouse);
      Alert.alert('Success', 'Warehouse updated successfully.');
      fetchWarehouseData();
      setEditModalVisible(false);
    } catch (error) {
      console.error('Error updating warehouse:', error);
      Alert.alert('Error', 'Could not update warehouse.');
    }
  };


  const deleteWarehouse = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/warehouse/delete/${selectedWarehouse._id}`);
      Alert.alert('Success', 'Warehouse deleted successfully.');
      fetchWarehouseData();
      setModalVisible(false);
    } catch (error) {
      console.error('Error deleting warehouse:', error);
      Alert.alert('Error', 'Could not delete warehouse.');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  if (warehouseData.length === 0) {
    return <Text>No available warehouses.</Text>;
  }

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.detailText}>Location: {item.location}</Text>
        <Text style={styles.detailText}>Capacity: {item.capacity}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => openViewModal(item)}>
        <Text style={styles.buttonText}>View</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Warehouse</Text>
        <TouchableOpacity style={styles.addButton} onPress={openCreateModal}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.containerList}
        data={warehouseData}
        renderItem={renderItem}
        keyExtractor={item => item.id ? item.id.toString() : Math.random().toString()}
      />

      <Modal visible={isCreateModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Create Warehouse</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={newWarehouse.name}
              onChangeText={text => setNewWarehouse({ ...newWarehouse, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Location"
              value={newWarehouse.location}
              onChangeText={text => setNewWarehouse({ ...newWarehouse, location: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Capacity"
              value={newWarehouse.capacity}
              onChangeText={text => setNewWarehouse({ ...newWarehouse, capacity: text })}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.button} onPress={createWarehouse}>
                <Text style={styles.buttonText}>Create</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={() => setCreateModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>



      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Warehouse Details</Text>
            <Text>Name: {selectedWarehouse?.name}</Text>
            <Text>Location: {selectedWarehouse?.location}</Text>
            <Text>Capacity: {selectedWarehouse?.capacity}</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.button} onPress={openEditModal}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.deleteButton]} onPress={deleteWarehouse}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={isEditModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Warehouse</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={newWarehouse.name}
              onChangeText={text => setNewWarehouse({ ...newWarehouse, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Location"
              value={newWarehouse.location}
              onChangeText={text => setNewWarehouse({ ...newWarehouse, location: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Capacity"
              value={newWarehouse.capacity}
              onChangeText={text => setNewWarehouse({ ...newWarehouse, capacity: text })}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.button} onPress={updateWarehouse}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={() => setEditModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    padding:10,
  },
  addButton: {
    marginLeft: 110,
    padding: 5,
    borderRadius: 5,
    width: 70,
    backgroundColor: '#4CAF50',
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  containerList: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  infoContainer: {
    flex: 1,
    paddingRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#666666',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 5,
    borderRadius: 5,
    width: 70,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid', 
  },
  closeButton: {
    backgroundColor: '#9E9E9E',
    padding: 5,
    borderRadius: 5,
    width: 70,
    borderWidth: 1,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 5,
    borderRadius: 5,
    width: 70,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid', 
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default Warehouse;
