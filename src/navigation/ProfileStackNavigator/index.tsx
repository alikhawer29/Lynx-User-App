import { createStackNavigator } from '@react-navigation/stack';
import { useAppSelector } from '../../hooks';
import { MyProfileStackParamList } from '../../interfaces';
import { selectLoggedIn } from '../../redux/Slices/AuthSlice';
import MyProfile from '../../screens/MyProfile';
import { ROUTES } from '../../utils/routes';
import Options from '../Options';

const Stack = createStackNavigator<MyProfileStackParamList>();

const ProfileStackNavigator = () => {

    const authorized = useAppSelector(selectLoggedIn)

    return (
        <Stack.Navigator screenOptions={props => Options(props, authorized)}>
            <Stack.Screen name={ROUTES.MY_PROFILE} component={MyProfile} />
        </Stack.Navigator>
    );
}

export default ProfileStackNavigator