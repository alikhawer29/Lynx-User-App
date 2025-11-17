import { createStackNavigator } from '@react-navigation/stack';
import { useAppSelector } from '../../hooks';
import { ServiceStackParamList } from '../../interfaces';
import { selectLoggedIn } from '../../redux/Slices/AuthSlice';
import Services from '../../screens/Services';
import ServiceDetails from '../../screens/ServiceDetails';
import RateAndReview from '../../screens/RateAndReview';
import BookService from '../../screens/BookService';
import LocationView from '../../screens/LocationView';
import ServiceDateTime from '../../screens/ServiceDateTime';
import PaymentDetails from '../../screens/PaymentDetails';
import { ROUTES } from '../../utils/routes';
import Options from '../Options';

const Stack = createStackNavigator<ServiceStackParamList>();

const ServiceStackNavigator = () => {

    const authorized = useAppSelector(selectLoggedIn)

    return (
        <Stack.Navigator initialRouteName={ROUTES.SERVICES} screenOptions={props => Options(props, authorized)}>
            <Stack.Screen name={ROUTES.SERVICES} component={Services} />
            <Stack.Screen name={ROUTES.SERVICE_DETAILS} component={ServiceDetails} />
            <Stack.Screen name={ROUTES.RATE_AND_REVIEW} component={RateAndReview} />
            <Stack.Screen name={ROUTES.BOOK_SERVICE} component={BookService} />
            <Stack.Screen name={ROUTES.LOCATION_VIEW} component={LocationView} />
            <Stack.Screen name={ROUTES.SERVICE_DATE_TIME} component={ServiceDateTime} />
            <Stack.Screen name={ROUTES.PAYMENT_DETAILS} component={PaymentDetails} />
        </Stack.Navigator >
    );
}

export default ServiceStackNavigator