import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { styles, buttonStyles } from "./styles";
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icon
import { useNavigation } from '@react-navigation/native';


const scheduleData = [
  { id: '1', time: '2024-09-17T08:00:00', patient: 'Nguyễn Văn A', service: 'face', notes: 'Khám tổng quát', completed: false },
  { id: '2', time: '2024-09-17T10:30:00', patient: 'Trần Thị B', service: 'face', notes: 'Kiểm tra huyết áp', completed: true },
  { id: '3', time: '2024-09-18T11:00:00', patient: 'Lê Văn C', service: 'face', notes: 'Khám tai mũi họng', completed: false },
  { id: '4', time: '2024-09-18T14:00:00', patient: 'Phạm Văn D', service: 'face', notes: 'Khám mắt', completed: true },
  { id: '5', time: '2024-09-19T16:00:00', patient: 'Nguyễn Thị E', service: 'face', notes: 'Kiểm tra tim mạch', completed: false },
  { id: '6', time: '2024-09-20T16:00:00', patient: 'Nguyễn Thị E', service: 'face', notes: 'Kiểm tra tim mạch', completed: false },
  { id: '7', time: '2024-09-20T08:00:00', patient: 'Nguyễn Văn A', service: 'face', notes: 'Khám tổng quát', completed: false },
  { id: '8', time: '2024-09-20T10:30:00', patient: 'Trần Thị B', service: 'face', notes: 'Kiểm tra huyết áp', completed: true },
  { id: '9', time: '2024-09-22T11:00:00', patient: 'Lê Văn C', service: 'face', notes: 'Khám tai mũi họng', completed: false },
  { id: '10', time: '2024-09-22T14:00:00', patient: 'Phạm Văn D', service: 'face', notes: 'Khám mắt', completed: true },
  { id: '11', time: '2024-09-23T16:00:00', patient: 'Nguyễn Thị E', service: 'face', notes: 'Kiểm tra tim mạch', completed: false },
  { id: '12', time: '2024-09-23T16:00:00', patient: 'Nguyễn Thị E', service: 'face', notes: 'Kiểm tra tim mạch', completed: false },
];
const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function schedule() {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState(scheduleData);
  const [weekOffset, setWeekOffset] = useState(0); // Offset for weeks
  const [selectedDate, setSelectedDate] = useState(null); // Selected date state
  const [statusFilter, setStatusFilter] = useState(false); // Status filter state
  const [selectedStatus, setSelectedStatus] = useState('incomplete');
  // dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Profile', value: '1' },
    { label: 'Link 2', value: '2' },
  ]);
  const navigation = useNavigation();
  // hiện dữ liệu theo ngày
  useEffect(() => {
    filterByDate(new Date(), statusFilter);
  }, []);

  //chọn ngày
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
  //click chọn ngày
  const filterByDate = (date, status) => {
    let filtered = scheduleData;
    if (date) {
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.time);
        return (
          itemDate.getDate() === date.getDate() &&
          itemDate.getMonth() === date.getMonth() &&
          itemDate.getFullYear() === date.getFullYear()
        );
      });
    }
    if (status !== null) {
      filtered = filtered.filter((item) => item.completed === status);
    }
    setFilteredData(filtered);
  };
  //nút chọn ngày
  const handleDatePress = (date) => {
    setSelectedDate(date);
    filterByDate(date, statusFilter);
  };
  //nút chọn status
  const hanldeStatusFilter = (status) => {
    setStatusFilter(status);
    setSelectedStatus(status ? 'complete' : 'incomplete');
    filterByDate(selectedDate, status);
  }

  const renderScheduleItem = ({ item }) => (
    <View style={styles.scheduleItem}>
      <View style={styles.infoRow}>
        <Text style={styles.labelText}>Patient:</Text>
        <Text style={styles.valueText}>{item.patient}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.labelText}>Service:</Text>
        <Text style={styles.valueText}>{item.service}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.labelText}>Date:</Text>
        <Text style={styles.valueText}>{item.time}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.labelText}>Patient Details:</Text>
        <TouchableOpacity
          style={styles.viewDetailsButton}
          onPress={() => navigation.navigate('/Appointmentdetail/AppointmentDetail', { id: item.id })} // Sửa đường dẫn tại đây
        >
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>Appointment </Text>
        <View style={styles.dropdownmenu}>
          {/* Thay thế button mặc định bằng TouchableOpacity */}
          <TouchableOpacity onPress={() => setOpen(!open)}>
            <Icon name="bars" size={24} color="#000" />
          </TouchableOpacity>

          {/* Dropdown menu */}
          {open && (
            <View style={styles.dropdownContainer}>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                showArrowIcon={false}
                placeholder=""
                style={styles.dropdownStyle}
                containerStyle={styles.dropdownContainerStyle}
                dropDownContainerStyle={styles.dropdownListStyle} // Thêm kiểu này để giữ các phần tử không bị dịch chuyển
                onChangeValue={(itemValue) => {
                  console.log('Selected value:', itemValue);
                  setOpen(false); // Đóng dropdown sau khi chọn
                }}
              />
            </View>
          )}
        </View>
      </View>

      {/* Week navigation */}
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

      {/* thanh lọc */}
      <View style={styles.statusFilterContainer}>
        <TouchableOpacity
          style={[
            styles.statusButton,
            statusFilter === false && styles.selectedStatusButton
          ]}
          onPress={() => hanldeStatusFilter(false)}
        >
          <Text style={styles.statusText}>Incomplete</Text>
          {selectedStatus === 'incomplete' && <View style={styles.underline} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.statusButton,
            statusFilter === true && styles.selectedStatusButton
          ]}
          onPress={() => hanldeStatusFilter(true)}
        >
          <Text style={styles.statusText}>Complete</Text>
          {selectedStatus === 'complete' && <View style={styles.underline} />}
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredData}
        renderItem={renderScheduleItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}
