import { createStackNavigator } from '@react-navigation/stack';
import { useAppSelector } from '../../hooks';
import { MyAppointmentsStackParamList } from '../../interfaces';
import { selectLoggedIn } from '../../redux/Slices/AuthSlice';
import MyAppointments from '../../screens/MyAppointments';
import AppointmentDetails from '../../screens/AppointmentDetails';
import { ROUTES } from '../../utils/routes';
import Options from '../Options';

const Stack = createStackNavigator<MyAppointmentsStackParamList>();

const MyAppointmentsStackNavigator = () => {
  const authorized = useAppSelector(selectLoggedIn);

  return (
    <Stack.Navigator
      initialRouteName={ROUTES.MY_APPOINTMENTS}
      screenOptions={props => Options(props, authorized)}
    >
      <Stack.Screen name={ROUTES.MY_APPOINTMENTS} component={MyAppointments} />
      <Stack.Screen name={ROUTES.APPOINTMENT_DETAILS} component={AppointmentDetails} />
    </Stack.Navigator>
  );
};

export default MyAppointmentsStackNavigator;

