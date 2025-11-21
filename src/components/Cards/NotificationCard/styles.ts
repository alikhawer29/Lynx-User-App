import { StyleSheet } from 'react-native';
import { GLOBAL_HORIZONTAL_PADDING, heightPixel } from '../../../utils/helper';
import colors from '../../../utils/colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: GLOBAL_HORIZONTAL_PADDING,
    marginVertical: heightPixel(10),
    paddingVertical: heightPixel(10),
  },
  bg_transparent: {
    backgroundColor: colors.transparent,
  },
  bg_primary_opacity: {
    backgroundColor: '#B69D741A',
  },
  icon_wrapper: {
    flex: 0.16,
  },
  content: {
    flex: 0.84,
    justifyContent: 'space-between',
    paddingVertical: heightPixel(6),
  },
  flex_wrapper: {
    flex: 1,
  },
});

export default styles;
