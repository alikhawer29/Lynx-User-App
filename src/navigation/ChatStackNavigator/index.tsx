import { createStackNavigator } from '@react-navigation/stack';
import UnderDevelopment from '../../components/UnderDevelopment';
import { useAppSelector } from '../../hooks';
import { ChatStackParamList } from '../../interfaces';
import { selectLoggedIn } from '../../redux/Slices/AuthSlice';
import { ROUTES } from '../../utils/routes';
import Options from '../Options';

const Stack = createStackNavigator<ChatStackParamList>();

const ChatStackNavigator = () => {

    const authorized = useAppSelector(selectLoggedIn)

    return (
        <Stack.Navigator screenOptions={props => Options(props, authorized)}>
            <Stack.Screen name={ROUTES.CHAT} component={UnderDevelopment} />
        </Stack.Navigator>
    );
}

export default ChatStackNavigator