import { StyleSheet } from 'react-native';
import { heightPixel } from '../../utils/helper';
import colors from '../../utils/colors';

const styles = StyleSheet.create({
  scroll_content: {
    paddingBottom: heightPixel(20),
  },
  service_image: {
    height: heightPixel(220),
    borderRadius: heightPixel(8),
  },
  info_section: {
    marginVertical: heightPixel(20),
    gap: heightPixel(10),
  },
  card_container: {
    marginVertical: heightPixel(30),
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    height: heightPixel(87),
    width: '45%',
    borderRadius: heightPixel(8),
    borderWidth: 1,
    borderColor: colors.light_gray,
    backgroundColor: colors.white,
  },
  selected_card: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  button: {
    marginTop: heightPixel(60),
  },
  premium_text: {
    marginTop: heightPixel(10),
  },
  visit_type_section: {
    marginTop: heightPixel(10),
    // marginBottom: heightPixel(10),
  },
  visit_type_title: {
    // marginBottom: heightPixel(10),
  },
  visit_type_container: {
    marginVertical: heightPixel(10),
  },
  visit_type_card: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: heightPixel(15),
    paddingHorizontal: heightPixel(10),
    width: '45%',
    borderRadius: heightPixel(8),
    borderWidth: 1,
    borderColor: colors.light_gray,
    backgroundColor: colors.white,
    // minHeight: heightPixel(60),
  },
  selected_visit_card: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
});

export default styles;
