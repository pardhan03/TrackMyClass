import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { horizontalScale, moderateScale, verticalScale } from '../../helpers/Metrics'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { deleteCourse, getCourses } from '../../db/Database'

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const navigation = useNavigation()
    const isFocused = useIsFocused()

    const handleGetCourseList = () =>{
        getCourses((result) =>{
            setCourses(result);
        })
    }

    const handleDeleteCourse = (id) =>{
        deleteCourse(
            id,
            (res)=>{
                Alert.alert('Course Deleted Successfully')
                handleGetCourseList()
            },
            (err)=>{
                Alert.alert('Something went wrong!')
            }
        )
    }

    useEffect(()=>{
        handleGetCourseList()
    }, [isFocused])

    const renderItems = ({item, index}) =>{
        <View style={styles.courseItem}>
            <View>
                <Text style={styles.courseName}>{item?.name}</Text>
                <Text style={styles.courseFees}>{item?.fees}</Text>
            </View>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={()=>{handleDeleteCourse(item?.id)}}>
                    <Image source={require('../../assets/images/delete.png')} style={styles.icon}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('AddCourse', { type: 'Edit', data: item})
                }}>
                    <Image source={require('../../assets/images/edit.png')} style={styles.icon}/>
                </TouchableOpacity>
            </View>
        </View>
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={courses}
                renderItem={renderItems}
            />
            <TouchableOpacity style={styles.addCourseBtn} onPress={() => {
                navigation.navigate('AddCourse', { type: 'New'})
            }}>
                <Text style={styles.btnText}>+ Add Course</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Courses

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    addCourseBtn: {
        width: horizontalScale(200),
        height: verticalScale(50),
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: verticalScale(50),
        right: horizontalScale(20),
        borderRadius: moderateScale(30),
    },
    btnText: {
        color: '#fff',
        fontSize: moderateScale(20)
    },
    courseItem: {
        width: "90%",
        height: verticalScale(100),
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: horizontalScale(20),
        marginTop: verticalScale(20),
        borderRadius: moderateScale(10),
        borderColor: "#f2f2f2"
    },
    courseName: {
        fontSize: moderateScale(30),
        fontWeight: '600',
    },
    courseFees: {
        color: 'green',
        fontSize: moderateScale(20),
        fontWeight: '600',
    },
    icon: {
        width: moderateScale(24),
        height: moderateScale(24)
    },
    iconContainer:{
        gap: moderateScale(10)
    }
})