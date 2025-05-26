import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Courses from '../screens/admin/Courses'
import AddCourse from '../screens/admin/AddCourse'
import AddSubject from '../screens/admin/AddSubject'

const Stack = createNativeStackNavigator()

const AdminNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name='Courses' component={Courses}/>
        <Stack.Screen name='AddCourse' component={AddCourse}/>
        <Stack.Screen name='AddSubject' component={AddSubject}/>
    </Stack.Navigator>
  )
}

export default AdminNavigator

const styles = StyleSheet.create({})