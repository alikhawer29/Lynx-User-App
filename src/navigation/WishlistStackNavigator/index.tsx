import { createStackNavigator } from '@react-navigation/stack';
import { useAppSelector } from '../../hooks';
import { WishlistStackParamList } from '../../interfaces';
import { selectLoggedIn } from '../../redux/Slices/AuthSlice';
import Wishlist from '../../screens/Wishlist';
import { ROUTES } from '../../utils/routes';
import Options from '../Options';

const Stack = createStackNavigator<WishlistStackParamList>();

const WishlistStackNavigator = () => {

    const authorized = useAppSelector(selectLoggedIn)

    return (
        <Stack.Navigator initialRouteName={ROUTES.WISHLIST} screenOptions={props => Options(props, authorized)}>
            <Stack.Screen name={ROUTES.WISHLIST} component={Wishlist} />
        </Stack.Navigator >
    );
}

export default WishlistStackNavigator