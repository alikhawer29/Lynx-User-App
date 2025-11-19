
import { createStackNavigator } from '@react-navigation/stack';
import { useAppSelector } from '../../hooks';
import { FaqsStackParamList } from '../../interfaces';
import { selectLoggedIn } from '../../redux/Slices/AuthSlice';
import Faqs from '../../screens/FAQs';
import { ROUTES } from '../../utils/routes';
import Options from '../Options';

const Stack = createStackNavigator<FaqsStackParamList>();

const FaqsStackNavigator = () => {
    const authorized = useAppSelector(selectLoggedIn)

    return (
        <Stack.Navigator screenOptions={props => Options(props, authorized)}>
            <Stack.Screen name={ROUTES.FAQS} component={Faqs} />
        </Stack.Navigator>
    );
}

export default FaqsStackNavigator