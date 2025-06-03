import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { getCoursDetail } from '../../db/Database';
import { styles } from './MyCourse';

const MyFees = () => {
  const [detail, setDetail] = useState(null);

  const route = useRoute();

  useEffect(()=>{
    getCoursDetail(
      route.params.data?.course_id,
      res =>{
        console.log(res)
        setDetail(res)
      },
      err=>{
        console.log('error', err)
      }
    )

  }, [])

  const renderItem = ({item}) =>(
    <View style={styles.subject}>
      <Text>{item?.name}</Text>
    </View>
  )
  return (
    <View>
      <Text>{`Total fees ${detail?.fees}`}</Text>
    </View>
  )
}

export default MyFees

const styles = StyleSheet.create({
  container: {

  }
})