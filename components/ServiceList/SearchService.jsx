import { View, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function SearchService({ placeholder, onSearch }) {  // onSearch as a prop
  const [text, setText] = useState('');

  const handleTextChange = (value) => {
    setText(value);
    if (onSearch) {  // Ensure onSearch is defined before calling it
      onSearch(value);  // Trigger search whenever text changes
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <Ionicons name="search" size={20} color="gray" />
        <TextInput
          style={styles.input}
          // inputAccessoryViewID={inputAccessoryViewID}
          onChangeText={handleTextChange}
          value={text}
          placeholder={placeholder ? placeholder : "Please type here..."}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',  // Căn giữa theo chiều dọc
    alignItems: 'center',      // Căn giữa theo chiều ngang
    padding: 20,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    borderWidth: 1,           // Thêm border
    borderColor: '#C0C0C0',   // Màu border
    paddingHorizontal: 10,
    height: 40,
    width: '90%',            // Chiếm toàn bộ chiều ngang
    maxWidth: 400,            // Đặt chiều rộng tối đa
  },
  input: {
    flex: 1,                  // Chiếm toàn bộ không gian còn lại
    paddingHorizontal: 5,
  },
});
