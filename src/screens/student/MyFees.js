import { StyleSheet, Text, TouchableOpacity, View, TextInput, Alert, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { getCoursDetail, getRemainingFees, submitFees, getPaymentHistory } from '../../db/Database';
import { horizontalScale, moderateScale, verticalScale } from '../../helpers/Metrics';

const MyFees = () => {
  const [detail, setDetail] = useState(null);
  const [remainingFees, setRemainingFees] = useState(0)
  const [showForm, setShowForm] = useState(true);
  const [fees, setFees] = useState(0)
  const [paymentHistory, setPaymentHistory]= useState([])

  const route = useRoute();

  const getFees = (total) => {
    getRemainingFees(
      route.params.data?.id,
      res => {
        setRemainingFees(total - res);
      }
    )
  }

  const handleSubmitFees = () => {
    const numericFees = Number(fees);

    if (!fees || isNaN(numericFees) || numericFees <= 0) {
      Alert.alert('Invalid input', 'Please enter a valid fee amount.');
      return;
    }

    if (numericFees > remainingFees) {
      Alert.alert('Invalid input', 'You cannot pay more than the remaining fees.');
      return;
    }

    const date = new Date().toISOString();
    submitFees(
      route.params.data?.id,
      numericFees,
      date,
      res => {
        Alert.alert('Success', JSON.stringify(res));
        setFees('');
        getFees(detail.fees);
      },
      err => {
        Alert.alert('Error', err?.message || JSON.stringify(err));
      }
    );
  };

  const handleGetPaymentHistory = () =>{
    getPaymentHistory(
      route.params.data?.id,
      (res) =>{
        console.log(res)
        setPaymentHistory(res)
      },
      (err)=>{
        console.log(err)
      }
    )
  }

  const renderPaymentHistoryData = ({item}) =>{
    return(
      <View style={styles.paymentItem}>
        <View style={styles.column}>
          <Text>{item?.date}</Text>
        </View>
        <View style={styles.column}>
          <Text>{item?.amount_paid}</Text>
        </View>
      </View>
    )
  }

  const historyListHeaderComponent = () =>{
    return(
      <View style={styles.paymentItem}>
        <View style={styles.column}>
          <Text>{'Date'}</Text>
        </View>
        <View style={styles.column}>
          <Text>{'Amount Paid'}</Text>
        </View>
      </View>
    )
  }

  useEffect(() => {

    if (remainingFees <= 0) {
      setShowForm(false);
    }

    getCoursDetail(
      route.params.data?.course_id,
      res => {
        setDetail(res)
        getFees(res?.fees)
      },
      err => {
        console.log('error', err)
      }
    )

    handleGetPaymentHistory()

  }, [remainingFees])

  return (
    <View style={styles.container}>
      <Text style={styles.totalFees}>{`Total Course fees: ${detail?.fees} INR`}</Text>
      <Text style={styles.totalFees}>{`Remaining fees: ${remainingFees} INR`}</Text>
      <FlatList
        data={paymentHistory}
        renderItem={renderPaymentHistoryData}
        ListHeaderComponent={historyListHeaderComponent}
      />
      <View style={styles.bottom}>
        {showForm &&
          <TextInput
            placeholder='Enter your fees'
            value={fees}
            onChangeText={setFees}
            style={styles.input}
            keyboardType='numeric'
          />
        }
        {showForm && <TouchableOpacity
          style={[styles.submitFees, { backgroundColor: remainingFees > 0 ? 'green' : '#9e9ee' }]}
          onPress={handleSubmitFees}
        >
          <Text>Submit fees</Text>
        </TouchableOpacity>}
      </View>
    </View>
  )
 }

export default MyFees

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  totalFees: {
    fontSize: moderateScale(20),
    fontWeight: '600',
    marginTop: verticalScale(20),
    marginLeft: horizontalScale(20)
  },
  submitFees: {
    width: '90%',
    height: verticalScale(48),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(8)
  },
  bottom: {
    width: '100%',
    position: 'absolute',
    bottom: verticalScale(50),
    alignSelf: 'center',
  },
  input: {
    width: '90%',
    height: verticalScale(48),
    borderWidth: moderateScale(1),
    alignSelf: 'center',
    marginBottom: verticalScale(30),
    paddingLeft: horizontalScale(20),
    borderRadius: moderateScale(8)
  },
  paymentItem: {
    width: '100%',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    height: verticalScale(50),
    borderWidth: 1,

  },
  column: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  }
})