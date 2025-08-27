import { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ServiceCard from '../../components/Cards/ServiceCard';
import Seperator from '../../components/Seperator';
import Text from '../../components/Text';
import Wrapper from '../../components/Wrapper';
import { useAppSelector } from '../../hooks';
import { selectLoggedIn } from '../../redux/Slices/AuthSlice';
import { SERVICES } from '../../utils/data';
import { navigate } from '../../utils/navigation';
import { ROUTES } from '../../utils/routes';
import { heightPixel } from '../../utils/helper';
import Row from '../../components/Row';
import colors from '../../utils/colors';
import Icon from '../../components/Icon';
import images from '../../assets/images';
import Input from '../../components/Input';
import styles from './styles';

const Services = () => {
  const authorized = useAppSelector(selectLoggedIn);

  const onPressCard = useCallback((id: string | number) => {
    navigate(ROUTES.SERVICE_DETAILS, { id });
  }, []);

  return (
    <Wrapper>
      {!authorized && (
        <Text weight="bold" size={23} position="center" line_height={28}>
          All Services
        </Text>
      )}
      <Row
        align="center"
        justify="space-between"
        style={{ marginVertical: heightPixel(15) }}
      >
        <View style={styles.search_container}>
          <Input
            placeholder="Search service ..."
            icon={images.search}
            height={42}
          />
        </View>
        <View style={styles.filter_container}>
          <Icon
            source={images.filters}
            border={colors.medium_gray}
            size={42}
            rounded
            less_rounded
          />
        </View>
      </Row>
      <FlatList
        data={SERVICES}
        renderItem={({ item }) => (
          <ServiceCard data={item} onPress={() => onPressCard(item.id)} />
        )}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Seperator />}
      />
    </Wrapper>
  );
};

export default Services;
