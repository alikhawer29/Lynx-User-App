import { createStackNavigator } from '@react-navigation/stack';
import { useAppSelector } from '../../hooks';
import { HomeStackParamList } from '../../interfaces';
import { selectLoggedIn } from '../../redux/Slices/AuthSlice';
import Home from '../../screens/Home';
import ServiceDetails from '../../screens/ServiceDetails';
import RateAndReview from '../../screens/RateAndReview';
import BookService from '../../screens/BookService';
import LocationView from '../../screens/LocationView';
import ServiceDateTime from '../../screens/ServiceDateTime';
import PaymentDetails from '../../screens/PaymentDetails';
import { ROUTES } from '../../utils/routes';
import Options from '../Options';

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {

    const authorized = useAppSelector(selectLoggedIn)

    return (
        <Stack.Navigator screenOptions={props => Options(props, authorized)}>
            <Stack.Screen name={ROUTES.HOME} component={Home} />
            <Stack.Screen name={ROUTES.SERVICE_DETAILS} component={ServiceDetails} />
            <Stack.Screen name={ROUTES.RATE_AND_REVIEW} component={RateAndReview} />
            <Stack.Screen name={ROUTES.BOOK_SERVICE} component={BookService} />
            <Stack.Screen name={ROUTES.LOCATION_VIEW} component={LocationView} />
            <Stack.Screen name={ROUTES.SERVICE_DATE_TIME} component={ServiceDateTime} />
            <Stack.Screen name={ROUTES.PAYMENT_DETAILS} component={PaymentDetails} />
        </Stack.Navigator>
    );
}

export default HomeStackNavigator