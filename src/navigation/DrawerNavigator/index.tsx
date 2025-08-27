import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import DrawerBar from '../../components/DrawerBar';
import { selectLoggedIn } from '../../redux/Slices/AuthSlice';
import ServiceDetails from '../../screens/ServiceDetails';
import colors from '../../utils/colors';
import { NAVIGATORS, ROUTES } from '../../utils/routes';
import BottomTabNavigator from '../BottomTabNavigator';
import NotificationStackNavigator from '../NotificationStackNavigator';
import Options from '../Options';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {

    const authorized = useSelector(selectLoggedIn)

    return (
        <Drawer.Navigator screenOptions={{ headerShown: false, drawerType: "slide", overlayColor: colors.transparent, drawerStyle: { backgroundColor: colors.light_primary, width: "70%" } }} drawerContent={(props) => <DrawerBar {...props} />} >
            <Drawer.Screen name={NAVIGATORS.BOTTOM} component={BottomTabNavigator} />
            <Drawer.Screen name={NAVIGATORS.NOTIFICATION_STACK} component={NotificationStackNavigator} />
            <Drawer.Screen name={ROUTES.SERVICE_DETAILS} component={ServiceDetails} options={(props) => Options(props, authorized)} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator