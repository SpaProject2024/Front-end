import { View, TextInput, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function SearchService({placeholder}) {
  const inputAccessoryViewID = 'uniqueID';
  const initialText = '';
  const [text, setText] = useState(initialText);

  return (
    <View style={styles.searchSection}>
      <Ionicons name="search" size={20} color="gray" />
      <TextInput
        style={styles.input}
        inputAccessoryViewID={inputAccessoryViewID}
        onChangeText={setText}
        value={text}
        placeholder={placeholder ? placeholder : "Please type here..."}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchSection: {    
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
  },
  input: {
    flex: 1,  // Chiếm toàn bộ không gian còn lại
    paddingHorizontal: 5,
  },
});