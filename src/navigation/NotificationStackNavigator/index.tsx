import { createStackNavigator } from '@react-navigation/stack';
import { useAppSelector } from '../../hooks';
import { NotificationStackParamList } from '../../interfaces';
import { selectLoggedIn } from '../../redux/Slices/AuthSlice';
import Notifications from '../../screens/Notifications';
import { ROUTES } from '../../utils/routes';
import Options from '../Options';

const Stack = createStackNavigator<NotificationStackParamList>();

const NotificationStackNavigator = () => {

    const authorized = useAppSelector(selectLoggedIn)

    return (
        <Stack.Navigator screenOptions={props => Options(props, authorized)}>
            <Stack.Screen name={ROUTES.NOTIFICATIONS} component={Notifications} />
        </Stack.Navigator>
    );
}

export default NotificationStackNavigator