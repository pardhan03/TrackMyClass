import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AdminNavigator from './AdminNavigator'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

const MainNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='AdminNavigator' component={AdminNavigator} options={{ headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigator

const styles = StyleSheet.create({})