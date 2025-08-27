import { createStackNavigator } from '@react-navigation/stack';
import { AuthStackParamList } from '../../interfaces';
import AuthType from '../../screens/Auth/AuthType';
import ForgotPassword from '../../screens/Auth/ForgotPassword';
import Login from '../../screens/Auth/Login';
import Register from '../../screens/Auth/Register';
import SetPassword from '../../screens/Auth/SetPassword';
import VerifyCode from '../../screens/Auth/VerifyCode';
import { ROUTES } from '../../utils/routes';

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={ROUTES.LOGIN} component={Login} />
            <Stack.Screen name={ROUTES.REGISTER} component={Register} />
            <Stack.Screen name={ROUTES.AUTH_TYPE} component={AuthType} />
            <Stack.Screen name={ROUTES.FORGOT_PASSWORD} component={ForgotPassword} />
            <Stack.Screen name={ROUTES.VERIFY_CODE} component={VerifyCode} />
            <Stack.Screen name={ROUTES.SET_PASSWORD} component={SetPassword} />
        </Stack.Navigator>
    );
}

export default AuthStackNavigator