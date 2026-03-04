import { StyleSheet } from 'react-native';
import colors from '../../../utils/colors';
import { heightPixel } from '../../../utils/helper';

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.light_gray,
    height: heightPixel(290),
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: heightPixel(8),
    padding: heightPixel(9),
    paddingBottom: heightPixel(20),
  },
  image_wrapper: {
    flex: 0.55,
  },
  image: {
    borderRadius: heightPixel(8),
  },
  content: {
    flex: 0.45,
    justifyContent: 'space-between',
  },
  text_content_wrapper: {
    paddingTop: heightPixel(5),
  },
  name_wrapper: {
    flex: 1,
    flexShrink: 1,
    marginRight: heightPixel(4),
    minWidth: 0,
  },
  service_type_text: {
    marginTop: heightPixel(2),
    marginBottom: heightPixel(2),
  },
  button: {
    // marginBottom: heightPixel(5),
  },
});
export default styles;
