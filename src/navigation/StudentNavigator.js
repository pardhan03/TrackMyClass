import Register from '../screens/student/Register';
import MarkAttendance from '../screens/student/MarkAttendance';
import CheckAttendance from '../screens/student/CheckAttendance';
import Dashboard from '../screens/student/DashBoard';
import Login from '../screens/student/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const StudentNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
      <Stack.Screen name="MarkAttendance" component={MarkAttendance} />
      <Stack.Screen name="CheckAttendance" component={CheckAttendance} />
    </Stack.Navigator>
  );
};

export default StudentNavigator;