import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';
import { heightPixel, widthPixel } from '../../utils/helper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.white,
    borderTopColor: '#E0E0E0',
    borderTopWidth: 1,
  },
  loading_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: heightPixel(100),
  },
  empty_list: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  date_separator: {
    alignItems: 'center',
    paddingVertical: heightPixel(12),
  },
  disabled_container: {
    backgroundColor: '#FFF3CD',
    paddingVertical: heightPixel(12),
    paddingHorizontal: widthPixel(16),
    borderTopWidth: 1,
    borderTopColor: '#FFE69C',
  },
});

export default styles;
