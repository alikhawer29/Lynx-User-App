import { createStackNavigator } from '@react-navigation/stack';
import { useAppSelector } from '../../hooks';
import { ServiceStackParamList } from '../../interfaces';
import { selectLoggedIn } from '../../redux/Slices/AuthSlice';
import Services from '../../screens/Services';
import { ROUTES } from '../../utils/routes';
import Options from '../Options';

const Stack = createStackNavigator<ServiceStackParamList>();

const ServiceStackNavigator = () => {

    const authorized = useAppSelector(selectLoggedIn)

    return (
        <Stack.Navigator initialRouteName={ROUTES.SERVICES} screenOptions={props => Options(props, authorized)}>
            <Stack.Screen name={ROUTES.SERVICES} component={Services} />
        </Stack.Navigator >
    );
}

export default ServiceStackNavigator