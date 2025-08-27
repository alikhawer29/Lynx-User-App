import { createStackNavigator } from '@react-navigation/stack';
import { useAppSelector } from '../../hooks';
import { HomeStackParamList } from '../../interfaces';
import { selectLoggedIn } from '../../redux/Slices/AuthSlice';
import Home from '../../screens/Home';
import { ROUTES } from '../../utils/routes';
import Options from '../Options';

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {

    const authorized = useAppSelector(selectLoggedIn)

    return (
        <Stack.Navigator screenOptions={props => Options(props, authorized)}>
            <Stack.Screen name={ROUTES.HOME} component={Home} />
        </Stack.Navigator>
    );
}

export default HomeStackNavigator