import { createStackNavigator } from '@react-navigation/stack';
import { useAppSelector } from '../../hooks';
import { HomeStackParamList } from '../../interfaces';
import { selectLoggedIn } from '../../redux/Slices/AuthSlice';
import Home from '../../screens/Home';
import { ROUTES } from '../../utils/routes';
import Options from '../Options';
import BookService from '../../screens/BookService';

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {

    const authorized = useAppSelector(selectLoggedIn)

    return (
        <Stack.Navigator screenOptions={props => Options(props, authorized)}>
            <Stack.Screen name={ROUTES.HOME} component={Home} />
            <Stack.Screen name={ROUTES.BOOK_SERVICE} component={BookService} />
        </Stack.Navigator>
    );
}

export default HomeStackNavigator