import { createStackNavigator } from '@react-navigation/stack';
import { useAppSelector } from '../../hooks';
import { ContactUsStackParamList } from '../../interfaces';
import { selectLoggedIn } from '../../redux/Slices/AuthSlice';
import ContactUs from '../../screens/ContactUs';
import { ROUTES } from '../../utils/routes';
import Options from '../Options';

const Stack = createStackNavigator<ContactUsStackParamList>();

const ContactStackNavigator = () => {

    const authorized = useAppSelector(selectLoggedIn)

    return (
        <Stack.Navigator screenOptions={props => Options(props, authorized)}>
            <Stack.Screen name={ROUTES.CONTACTUS} component={ContactUs} />
        </Stack.Navigator>
    );
}

export default ContactStackNavigator