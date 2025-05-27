import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import { getCourses, insertSubject } from '../../db/Database'
import { useIsFocused } from '@react-navigation/native'

const AddSubject = () => {
  const [courses, setCourses] = useState([]);
  const isFocused = useIsFocused();
  const [selectedCourse, setSelectedCourse] = useState('');
  const [subject, setSubject] = useState('');

  useEffect(() => {
    getCourseList();
  }, [isFocused]);
  const getCourseList = () => {
    getCourses(result => {
      
      const list = [];
      for (let i = 0; i < result.length; i++) {
        list.push({label: result[i].name, value: result[i].id});
      }
      setCourses(list);
      if (list.length > 0) selectedCourse(list[0].value);
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={subject}
        onChangeText={setSubject}
        placeholder="Enter Subject Name"
        style={styles.input}
      />
      <Dropdown
        style={styles.dropdown}
        data={courses}
        labelField={'label'}
        valueField={'value'}
        onChange={item => {
          setSelectedCourse(item.value);
        }}
      />
      <TouchableOpacity
        onPress={() => {
          insertSubject(
            subject,
            selectedCourse,
            res => {
              setSubject('');
              Alert.alert('subject saved');
            },
            err => {
              Alert.alert('error', err);
            },
          );
        }}
        style={styles.submitBtn}>
        <Text style={styles.txt}>Submit Subject</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AddSubject

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txt: {
    color: 'white',
  },
  input: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderColor: '#cccccc',
    marginTop: 50,
    alignSelf: 'center',
    paddingLeft: 10,
    borderRadius: 8,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  submitBtn: {
    width: '90%',
    height: 50,
    marginTop: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'center',
  },
})