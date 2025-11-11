import { useIsFocused } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { ImageBackground, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import images from '../../assets/images';
import HomeCarousel from '../../components/HomeCarousel';
import Row from '../../components/Row';
import Text from '../../components/Text';
import Wrapper from '../../components/Wrapper';
import { ServiceData } from '../../interfaces';
import { useGetServicesQuery, useHandleFavoriteMutation } from '../../redux/Apis/Service';
import colors from '../../utils/colors';
import { navigate } from '../../utils/navigation';
import { NAVIGATORS } from '../../utils/routes';
import styles from './styles';

const Home = () => {

  const isFocused = useIsFocused()

  const { data, isFetching: isLoading, refetch, isSuccess } = useGetServicesQuery({})
  const [favorite, { isSuccess: isFavoriteSuccess }] = useHandleFavoriteMutation({})

  const [services, setServices] = useState<ServiceData[]>([])

  useEffect(() => {
    if (isSuccess && data?.data && !isLoading) {
      setServices(data?.data || [])
    }
  }, [isSuccess, data, isLoading])

  useEffect(() => {
    if (isFocused) {
      refetch()
    }
  }, [isFocused])

  useEffect(() => {
    if (isFavoriteSuccess) {
      refetch()
    }
  }, [isFavoriteSuccess])

  const onPressViewAll = useCallback(() => {
    // Navigate to the Services tab in the BottomTabNavigator
    navigate(NAVIGATORS.SERVICE_STACK);
  }, []);

  const onFavorite = useCallback((id: string) => {

    favorite(id)

    let updated_services = services.map((item: ServiceData) => {
      if (item._id === id) {
        return {
          ...item,
          is_favorite: !item.is_favorite
        }
      } else {
        return item
      }
    })

    setServices(updated_services)

  }, [services])

  return (
    <Wrapper scroll>
      <ImageBackground
        source={images.home_banner}
        style={styles.banner}
        imageStyle={styles.banner_image}
      >
        <LinearGradient
          colors={[colors.transparent, colors.black]}
          style={styles.banner_gradient}
        >
          <View style={styles.banner_gradient_child}>
            <Text size={22} line_height={32} color={colors.white} weight="bold">
              Lynx Consultancy
            </Text>
            <Text
              size={15}
              line_height={18}
              color={colors.white}
              weight="bold"
              style={styles.banner_subtitle}
            >
              Offers bespoke services, catering to our clients
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
      <View style={styles.section}>
        <Row align="center" justify="space-between">
          <Text size={23} line_height={32} weight="bold">
            All Services
          </Text>
          <Text
            color={colors.primary}
            underline
            weight="bold"
            onPress={onPressViewAll}
          >
            View All
          </Text>
        </Row>
        <HomeCarousel data={services} onFavorite={onFavorite} />
      </View>
      <View style={styles.section}>
        <Text size={23} line_height={32} weight="bold">
          About Lynx Consultancy
        </Text>
        <Text style={styles.about_text}>
          We provide reliable and skilled staffing solutions to meet your
          healthcare facility’s needs. From short-term coverage to long-term
          placements, our professionals are ready to step in with confidence and
          care. Let us help you maintain quality patient care with dependable
          support.
        </Text>
      </View>
    </Wrapper>
  );
};

export default Home;
