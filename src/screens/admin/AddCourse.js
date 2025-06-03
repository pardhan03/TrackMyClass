import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { horizontalScale, moderateScale, verticalScale } from '../../helpers/Metrics'
import { insertCourse, updateCourse } from '../../db/Database'
import { useNavigation, useRoute } from '@react-navigation/native'

const AddCourse = () => {

    const route = useRoute();
    const navigation = useNavigation();

    const [name, setName] = useState(
        route?.params?.type == 'Edit' ? route?.params?.data?.name : ''
    )
    const [fees, setFees] = useState(
        route?.params?.type == 'Edit' ? String(route?.params?.data?.fees) : ''
    )
    const [message, setMessage] = useState({})

    const handleOnChangeName = (txt) =>{
        setName(txt)
    }

    const handleOnChangeFees = (value) =>{
        setFees(value)
    }

    const handleInsertCourse = () => {
        insertCourse(
            name, parseInt(fees),
            res =>{
                setMessage({type: 'success', msg: 'Course added successfully'})
            },
            err =>{
                setMessage({type: 'error', msg: err})
                console.log(err)
            }
        )
    }

    const handleUpdateCourse = (id, name, fees) =>{
        updateCourse(id, name, fees,
            res=>{
                setMessage({type: 'success', msg: 'Course edit successfully'})
            },
            err=>{
                setMessage({type: 'error', msg: err})
            }
        )
    }

    useEffect(()=>{
        if(route?.params?.type == 'Edit'){
            navigation.setOptions({
                title: 'Update Course'
            })
        }
    }, [route.params.type])

  return (
    <View style={styles.container}>
      <TextInput 
        placeholder='Enter Course name' 
        value={name}
        style={styles.input}
        onChangeText={handleOnChangeName}
      />
      <TextInput 
        placeholder='Enter Course fees' 
        value={fees}
        style={styles.input}
        onChangeText={handleOnChangeFees}
      />
        {message?.msg != '' &&
            <Text style={[
                {
                  color: message?.type == 'error' ? 'red' : 'green'
                },
                styles.messageStyle
              ]}
            >
                {message?.msg}
            </Text>
        }
      <TouchableOpacity 
        style={styles.submitBtn} 
        onPress={()=>{
            if(route?.params?.type == 'Edit'){
                handleUpdateCourse(route?.params?.data?.id, name, parseInt(fees))
            } else{
                handleInsertCourse()
            }
        }}
      >
        <Text style={styles.btnTxt}>
            {
                route?.params?.type == 'Edit' ? "Update Course" : "Submit Course"
            }
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default AddCourse

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: moderateScale(10)
    },
    input: {
        width: '90%',
        height: verticalScale(50),
        borderRadius: moderateScale(10),
        borderWidth: 1,
        borderColor: '#cccccc',
        paddingLeft: horizontalScale(20),
        color: 'black'

    },
    submitBtn:{
        width: '90%',
        height: verticalScale(50),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        marginTop: verticalScale(20),
        borderRadius: moderateScale(10)
    },
    btnTxt:{
        color: 'white'
    },
    messageStyle: {
        alignItems: 'flex-start',
        marginLeft: horizontalScale(30),
        marginTop: verticalScale(10)
    }
})