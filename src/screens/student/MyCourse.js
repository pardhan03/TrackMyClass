import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getCoursDetail, getStudentSubjects } from '../../db/Database'
import { useRoute } from '@react-navigation/native'
import { horizontalScale, moderateScale, verticalScale } from '../../helpers/Metrics'

const MyCourse = () => {
  const [detail, setDetail] = useState(null);
  const [subjects, setSubjects] = useState([]);
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

    getStudentSubjects(
      route.params.data?.course_id,
      res =>{
        console.log(res)
        setSubjects(res)
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.course}>{`My Course: ${detail?.name}`}</Text>
      <Text style={styles.fess}>{`Course fees: ${detail?.fees}`}</Text>
      <Text style={styles.heading}>Subjects</Text>
        <View style={{width: '100%'}}>
          <FlatList
          data={subjects}
          renderItem={renderItem}
        />
        </View>
    </SafeAreaView>
  )
}

export default MyCourse

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
  },
  course: {
    fontSize: moderateScale(30),
    fontWeight: '600'
  },
  fess: {
    fontSize: moderateScale(20),

  },
  subject: {
    width: '90%',
    height: verticalScale(40),
    borderRadius: moderateScale(8),
    borderWidth: moderateScale(1),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: verticalScale(20)
  },
  heading: {
    marginLeft: horizontalScale(20),
    alignSelf: 'flex-start',
    fontSize: moderateScale(24),
    marginTop: verticalScale(20)
  }
})