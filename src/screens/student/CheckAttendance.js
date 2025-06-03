import {View, Text, StyleSheet, FlatList, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import { getAttendanceByMonth } from '../../db/Database';
import { useRoute } from '@react-navigation/native';

const CheckAttendance = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [attendance, setAttendances] = useState([]);
  const route = useRoute();

  useEffect(() => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    getAttendanceByMonth(
      route.params.data.id,
      month,
      year,
      res => {
        setAttendances(res);
      },
      err => {
        console.log(err);
      },
    );

    const formattedDate = date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'long',
    });
    setCurrentDate(formattedDate);
  }, []);
  
  return (
    <View style={styles.container}>
      <Text style={styles.date}>{currentDate}</Text>
      <FlatList
        numColumns={6}
        data={attendance}
        renderItem={({item}) => {
          return (
            <View style={styles.attendanceItem}>
              <View style={styles.attendance}>
                <Text>{item.date.split('-')[2]}</Text>
                <Text
                  style={[
                    styles.status,
                    {color: item.status == 'PRESENT' ? 'green' : 'red'},
                  ]}>
                  {item.status == 'PRESENT' ? 'P' : 'A'}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default CheckAttendance;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  date: {
    fontSize: 25,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },

  attendance: {
    height: 60,
    width: '90%',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  attendanceItem: {
    width: Dimensions.get('window').width / 6,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {
    fontSize: 25,
    fontWeight: '600',
  },
});