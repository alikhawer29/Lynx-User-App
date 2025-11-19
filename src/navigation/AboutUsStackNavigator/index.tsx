
import { createStackNavigator } from '@react-navigation/stack';
import { useAppSelector } from '../../hooks';
import { AboutUsStackParamList } from '../../interfaces';
import { selectLoggedIn } from '../../redux/Slices/AuthSlice';
import AboutUs from '../../screens/AboutUS';
import { ROUTES } from '../../utils/routes';
import Options from '../Options';

const Stack = createStackNavigator<AboutUsStackParamList>();

const AboutUsStackNavigator = () => {
    const authorized = useAppSelector(selectLoggedIn)

    return (
        <Stack.Navigator screenOptions={props => Options(props, authorized)}>
            <Stack.Screen name={ROUTES.ABOUTUS} component={AboutUs} />
        </Stack.Navigator>

    );
}

export default AboutUsStackNavigator