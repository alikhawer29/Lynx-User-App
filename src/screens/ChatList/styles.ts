import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';
import { heightPixel, widthPixel } from '../../utils/helper';

const styles = StyleSheet.create({
  header_container: {
    paddingTop: heightPixel(16),
    paddingBottom: heightPixel(12),
  },
  search_container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: widthPixel(8),
    paddingHorizontal: widthPixel(16),
    borderWidth: 1,
    borderColor: '#66666633',
  },
  search_input: {
    flex: 1,
    marginLeft: widthPixel(8),
    fontSize: 14,
    color: '#333333',
  },
  filter_container: {
    flexDirection: 'row',
    gap: widthPixel(12),
  },
  filter_button: {
    paddingHorizontal: widthPixel(20),
    paddingVertical: heightPixel(8),
    borderRadius: widthPixel(20),
    backgroundColor: '#F5F5F5',
  },
  filter_button_active: {
    backgroundColor: colors.primary,
  },
  loading_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: heightPixel(100),
  },
  empty_list: {
    flexGrow: 1,
  },
});

export default styles;
