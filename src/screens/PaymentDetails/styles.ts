import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';
import { heightPixel } from '../../utils/helper';

const styles = StyleSheet.create({
  scroll_content: {
    paddingBottom: heightPixel(30),
  },
  amount_label: {
    marginBottom: heightPixel(25),
    alignItems: 'center',
  },
  form_section: {
    gap: heightPixel(5),
  },
  half_input: {
    flex: 1,
  },
  pay_button: {
    marginTop: heightPixel(30),
  },
  loading_container: {
    paddingVertical: heightPixel(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  card_field: {
    width: '100%',
    height: heightPixel(50),
    marginVertical: heightPixel(10),
  },
  modal_overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
  },
  modal_content: {
    width: '70%',
    backgroundColor: colors.white,
    borderRadius: heightPixel(10),
    padding: heightPixel(20),
    paddingBottom: heightPixel(30),
    alignItems: 'center',
  },
  close_icon: {
    alignSelf: 'flex-end',
    marginBottom: heightPixel(10),
  },
  modal_icon: {
    height: heightPixel(78),
    width: heightPixel(78),
    resizeMode: 'contain',
    marginBottom: heightPixel(20),
  },
  modal_title: {
    marginBottom: heightPixel(10),
  },
  modal_message: {
    marginBottom: heightPixel(30),
    width: '80%',
  },
  modal_buttons: {
    width: '100%',
  },
  modal_button: {
    flex: 1,
  },
});

export default styles;
