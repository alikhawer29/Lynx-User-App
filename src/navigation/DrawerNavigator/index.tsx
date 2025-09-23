import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import DrawerBar from '../../components/DrawerBar';
import { selectLoggedIn } from '../../redux/Slices/AuthSlice';
import ChangePassword from '../../screens/ChangePassword';
import EditProfile from '../../screens/EditProfile';
import ServiceDetails from '../../screens/ServiceDetails';
import colors from '../../utils/colors';
import { NAVIGATORS, ROUTES } from '../../utils/routes';
import BottomTabNavigator from '../BottomTabNavigator';
import ContactStackNavigator from '../ContactStackNavigator';
import NotificationStackNavigator from '../NotificationStackNavigator';
import Options from '../Options';
import WishlistStackNavigator from '../WishlistStackNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {

    const authorized = useSelector(selectLoggedIn)

    return (
        <Drawer.Navigator screenOptions={{ headerShown: false, drawerType: "slide", overlayColor: colors.transparent, drawerStyle: { backgroundColor: colors.light_primary, width: "70%" } }} drawerContent={(props) => <DrawerBar {...props} />} >
            <Drawer.Screen name={NAVIGATORS.BOTTOM} component={BottomTabNavigator} />
            <Drawer.Screen name={NAVIGATORS.WISHLIST_STACK} component={WishlistStackNavigator} />
            <Drawer.Screen name={NAVIGATORS.NOTIFICATION_STACK} component={NotificationStackNavigator} />
            <Drawer.Screen name={NAVIGATORS.CONTACT_STACK} component={ContactStackNavigator} />
            <Drawer.Screen name={ROUTES.SERVICE_DETAILS} component={ServiceDetails} options={(props) => Options(props, authorized)} />
            <Drawer.Screen name={ROUTES.CHANGE_PASSWORD} component={ChangePassword} options={(props) => Options(props, authorized)} />
            <Drawer.Screen name={ROUTES.EDIT_PROFILE} component={EditProfile} options={(props) => Options(props, authorized)} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator