import { FlatList, View } from 'react-native';
import images from '../../assets/images';
import ContentCard from '../../components/Cards/ContentCard';
import Empty from '../../components/Empty';
import Input from '../../components/Input';
import Loader from '../../components/Loader';
import Row from '../../components/Row';
import Seperator from '../../components/Seperator';
import Text from '../../components/Text';
import Touchable from '../../components/Touchable';
import Wrapper from '../../components/Wrapper';
import { ServiceData } from '../../interfaces';
import colors from '../../utils/colors';
import { heightPixel } from '../../utils/helper';
import styles from './styles';
import useOfflineContentController from './useOfflineContentController';

const OfflineContent = () => {

  const {
    values: {
      data,
      isLoading,
      search,
      selected,
      TABS
    },
    functions: {
      onPressCard,
      onChangeSearch,
      onChangeTab
    }
  } = useOfflineContentController()

  return (
    <Wrapper>
      <Row align='center' style={{ height: heightPixel(52), borderWidth: 1, borderColor: colors.medium_gray, borderRadius: heightPixel(8) }}>
        {
          TABS.map((item, index) => (
            <Touchable key={index} style={{ flex: 0.5, padding: heightPixel(3) }} onPress={() => onChangeTab(item.value)}>
              <View style={{ flex: 1, backgroundColor: selected === item.value ? colors.primary : colors.transparent, width: "100%", justifyContent: "center", alignItems: "center", borderRadius: heightPixel(6) }}>
                <Text weight='bold' color={selected === item.value ? colors.white : colors.black}>{item?.label}</Text>
              </View>
            </Touchable>
          ))
        }
      </Row>
      <Row
        align="center"
        justify="space-between"
        style={{ marginVertical: heightPixel(15) }}
      >
        <View style={styles.search_container}>
          <Input
            placeholder={`Search ${selected} ...`}
            icon={images.search}
            height={42}
            value={search}
            onChangeText={onChangeSearch}
          />
        </View>
      </Row>
      {
        isLoading ? <Loader text="Loading" size={35} vertical={30} /> :
          <FlatList
            keyExtractor={(item: ServiceData) => item._id.toString()}
            data={data}
            renderItem={({ item }: { item: ServiceData }) => <ContentCard type={selected} data={item} onPress={() => onPressCard(item)} />}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <Seperator />}
            refreshing={isLoading}
            ListEmptyComponent={() => <Empty label={`No ${selected} Found`} />}
          />
      }
    </Wrapper>
  );
};

export default OfflineContent
