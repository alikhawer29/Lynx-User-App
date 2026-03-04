import { StyleSheet } from 'react-native';
import colors from '../../../utils/colors';
import { heightPixel, widthPixel } from '../../../utils/helper';

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.light_gray,
    height: heightPixel(306),
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: heightPixel(8),
    padding: heightPixel(14),
  },
  image_wrapper: {
    flex: 0.5,
  },
  image: {
    borderRadius: heightPixel(8),
  },
  content: {
    flex: 0.5,
    justifyContent: 'space-between',
    paddingTop: heightPixel(15),
  },
  name_row: {
    flex: 1,
    flexShrink: 1,
    marginRight: widthPixel(4),
    minWidth: 0,
  },
  name_wrapper: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
  },
  service_type_text: {
    marginTop: heightPixel(4),
    marginBottom: heightPixel(2),
  },
});

export default styles;
