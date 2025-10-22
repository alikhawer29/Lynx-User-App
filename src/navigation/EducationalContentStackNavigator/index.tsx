import { createStackNavigator } from '@react-navigation/stack';
import { useAppSelector } from '../../hooks';
import { EducationalContentStackParamList } from '../../interfaces';
import { selectLoggedIn } from '../../redux/Slices/AuthSlice';
import EducationalContent from '../../screens/EducationalContent';
import ViewArticle from '../../screens/ViewArticle';
import ViewVideo from '../../screens/ViewVideo';
import { ROUTES } from '../../utils/routes';
import Options from '../Options';

const Stack = createStackNavigator<EducationalContentStackParamList>();

const EducationalContentStackNavigator = () => {

    const authorized = useAppSelector(selectLoggedIn)

    return (
        <Stack.Navigator initialRouteName={ROUTES.EDUCATIONAL_CONTENT} screenOptions={props => Options(props, authorized)}>
            <Stack.Screen name={ROUTES.EDUCATIONAL_CONTENT} component={EducationalContent} />
            <Stack.Screen name={ROUTES.VIEW_ARTICLE} component={ViewArticle} />
            <Stack.Screen name={ROUTES.VIEW_VIDEO} component={ViewVideo} />
        </Stack.Navigator >
    );
}

export default EducationalContentStackNavigator