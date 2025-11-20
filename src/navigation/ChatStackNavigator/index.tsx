import { createStackNavigator } from '@react-navigation/stack';
import { useAppSelector } from '../../hooks';
import { ChatStackParamList } from '../../interfaces';
import { selectLoggedIn } from '../../redux/Slices/AuthSlice';
import ChatList from '../../screens/ChatList';
import ChatRoom from '../../screens/ChatRoom';
import { ROUTES } from '../../utils/routes';
import Options from '../Options';

const Stack = createStackNavigator<ChatStackParamList>();

const ChatStackNavigator = () => {

    const authorized = useAppSelector(selectLoggedIn)

    return (
        <Stack.Navigator screenOptions={props => Options(props, authorized)}>
            <Stack.Screen name={ROUTES.CHAT_LIST} component={ChatList} />
            <Stack.Screen name={ROUTES.CHAT_ROOM} component={ChatRoom} />
        </Stack.Navigator>
    );
}

export default ChatStackNavigator