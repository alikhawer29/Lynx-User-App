import { FlatList, View } from 'react-native';
import images from '../../assets/images';
import ServiceCard from '../../components/Cards/ServiceCard';
import Empty from '../../components/Empty';
import FilterModal from '../../components/FilterModal';
import Icon from '../../components/Icon';
import Input from '../../components/Input';
import Loader from '../../components/Loader';
import Row from '../../components/Row';
import Seperator from '../../components/Seperator';
import Wrapper from '../../components/Wrapper';
import { ServiceData } from '../../interfaces';
import colors from '../../utils/colors';
import { heightPixel } from '../../utils/helper';
import styles from './styles';
import useWishlistController from './useWishlistController';

const Wishlist = () => {

  const {
    values: {
      data,
      isLoading,
      filter_modal_open,
      selected_filters,
      search
    },
    functions: {
      onReload,
      onFavorite,
      onPressCard,
      toggleFilterModal,
      onApplyFilters,
      onChangeSearch
    }
  } = useWishlistController()

  return (
    <Wrapper>
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
            value={search}
            onChangeText={onChangeSearch}
          />
        </View>
        <View style={styles.filter_container}>
          {
            selected_filters.length > 0 &&
            <View style={styles.red_dot} />
          }
          <Icon
            source={images.filters}
            border={colors.medium_gray}
            size={42}
            rounded
            less_rounded
            onPress={toggleFilterModal}
          />
        </View>
      </Row>
      {
        isLoading ? <Loader text="Loading" size={35} vertical={30} /> :
          <FlatList
            keyExtractor={(item) => item._id.toString()}
            data={data}
            renderItem={({ item }: { item: ServiceData }) => <ServiceCard data={item} onPress={() => onPressCard(item._id)} onFavorite={() => onFavorite(item._id)} />}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <Seperator />}
            onRefresh={onReload}
            refreshing={isLoading}
            ListEmptyComponent={() => <Empty label='No Services Found' />}
          />
      }
      <FilterModal open={filter_modal_open} handleClose={toggleFilterModal} onApply={onApplyFilters} filters={selected_filters} />
    </Wrapper>
  );
};

export default Wishlist
