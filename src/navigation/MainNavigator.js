import { StyleSheet } from 'react-native'
import AdminNavigator from './AdminNavigator'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import UserSelection from '../screens/UserSelection'
import StudentNavigator from './StudentNavigator'

const Stack = createNativeStackNavigator()

const MainNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
        <Stack.Screen
          name="UserSelection"
          component={UserSelection}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AdminNavigator"
          component={AdminNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StudentNavigator"
          component={StudentNavigator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigator

const styles = StyleSheet.create({})