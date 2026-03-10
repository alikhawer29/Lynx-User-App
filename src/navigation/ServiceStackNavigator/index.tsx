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
import React from 'react';
import { View } from 'react-native';
import Text from '../../components/Text';
import Button from '../../components/Button';
import { navigateAndSimpleReset } from '../../utils/navigation';
import { NAVIGATORS } from '../../utils/routes';

const Stack = createStackNavigator<ServiceStackParamList>();

// Authentication Guard Component
const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const authorized = useAppSelector(selectLoggedIn);

    if (!authorized) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                <Text size={18} weight="bold" style={{ marginBottom: 20, textAlign: 'center' }}>
                    Authentication Required
                </Text>
                <Text size={14} style={{ marginBottom: 30, textAlign: 'center', color: '#666' }}>
                    Please login to access booking features
                </Text>
                <Button
                    text="Login"
                    onPress={() => navigateAndSimpleReset(NAVIGATORS.AUTH_STACK, 0, {
                        screen: ROUTES.LOGIN,
                    })}
                />
            </View>
        );
    }

    return <>{children}</>;
};

const ServiceStackNavigator = () => {

    const authorized = useAppSelector(selectLoggedIn)

    return (
        <Stack.Navigator initialRouteName={ROUTES.SERVICES} screenOptions={props => Options(props, authorized)}>
            <Stack.Screen name={ROUTES.SERVICES} component={Services} />
            <Stack.Screen name={ROUTES.SERVICE_DETAILS} component={ServiceDetails} />
            <Stack.Screen name={ROUTES.RATE_AND_REVIEW} component={RateAndReview} />
            <Stack.Screen name={ROUTES.BOOK_SERVICE}>
                {() => (
                    <AuthGuard>
                        <BookService />
                    </AuthGuard>
                )}
            </Stack.Screen>
            <Stack.Screen name={ROUTES.LOCATION_VIEW} component={LocationView} />
            <Stack.Screen name={ROUTES.SERVICE_DATE_TIME}>
                {() => (
                    <AuthGuard>
                        <ServiceDateTime />
                    </AuthGuard>
                )}
            </Stack.Screen>
            <Stack.Screen name={ROUTES.PAYMENT_DETAILS}>
                {() => (
                    <AuthGuard>
                        <PaymentDetails />
                    </AuthGuard>
                )}
            </Stack.Screen>
        </Stack.Navigator >
    );
}

export default ServiceStackNavigator