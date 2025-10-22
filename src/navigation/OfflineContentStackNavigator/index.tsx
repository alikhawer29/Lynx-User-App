import { createStackNavigator } from '@react-navigation/stack';
import { useAppSelector } from '../../hooks';
import { OfflineContentStackParamList } from '../../interfaces';
import { selectLoggedIn } from '../../redux/Slices/AuthSlice';
import OfflineContent from '../../screens/OfflineContent';
import ViewArticle from '../../screens/ViewArticle';
import ViewVideo from '../../screens/ViewVideo';
import { ROUTES } from '../../utils/routes';
import Options from '../Options';

const Stack = createStackNavigator<OfflineContentStackParamList>();

const OfflineContentStackNavigator = () => {

    const authorized = useAppSelector(selectLoggedIn)

    return (
        <Stack.Navigator initialRouteName={ROUTES.OFFLINE_CONTENT} screenOptions={props => Options(props, authorized)}>
            <Stack.Screen name={ROUTES.OFFLINE_CONTENT} component={OfflineContent} />
            <Stack.Screen name={ROUTES.VIEW_ARTICLE} component={ViewArticle} />
            <Stack.Screen name={ROUTES.VIEW_VIDEO} component={ViewVideo} />
        </Stack.Navigator >
    );
}

export default OfflineContentStackNavigator