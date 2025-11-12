import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';
import { heightPixel, widthPixel, GLOBAL_HORIZONTAL_PADDING } from '../../utils/helper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scroll_content: {
    paddingHorizontal: GLOBAL_HORIZONTAL_PADDING,
    paddingBottom: heightPixel(100),
  },
  loading_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  service_image: {
    width: '100%',
    height: heightPixel(200),
    borderRadius: heightPixel(12),
    marginTop: heightPixel(20),
    marginBottom: heightPixel(15),
  },
  provider_row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: heightPixel(15),
  },
  provider_info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  provider_avatar: {
    width: widthPixel(40),
    height: widthPixel(40),
    borderRadius: widthPixel(20),
    marginRight: widthPixel(10),
  },
  provider_text_container: {
    justifyContent: 'center',
  },
  provider_label: {
    fontSize: 12,
    color: colors.dark_gray,
  },
  provider_name: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
  },
  status_badge: {
    paddingHorizontal: widthPixel(12),
    paddingVertical: heightPixel(6),
    borderRadius: heightPixel(3),
  },
  status_text: {
    fontSize: 12,
    fontWeight: '600',
  },
  service_name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: heightPixel(5),
  },
  category_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: heightPixel(20),
  },
  category_text: {
    fontSize: 14,
    color: colors.dark_gray,
  },
  price_text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
  },
  price_type: {
    fontSize: 12,
    color: colors.dark_gray,
  },
  section_title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    marginTop: heightPixel(20),
    marginBottom: heightPixel(15),
  },
  details_grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  detail_item: {
    width: '48%',
    marginBottom: heightPixel(15),
  },
  detail_item_full: {
    width: '100%',
    marginBottom: heightPixel(15),
  },
  detail_label: {
    fontSize: 12,
    color: colors.dark_gray,
    marginBottom: heightPixel(4),
  },
  detail_value: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
  },
  location_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  view_location_text: {
    fontSize: 14,
    color: colors.primary,
    marginLeft: widthPixel(5),
    textDecorationLine: 'underline',
  },
  requested_section: {
    backgroundColor: '#FFF4E5',
    padding: heightPixel(15),
    borderRadius: heightPixel(8),
    marginTop: heightPixel(20),
    marginBottom: heightPixel(20),
  },
  requested_title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: heightPixel(10),
  },
  requested_details_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  requested_detail_item: {
    flex: 1,
  },
  button_container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    paddingHorizontal: GLOBAL_HORIZONTAL_PADDING,
    paddingVertical: heightPixel(15),
    borderTopWidth: 1,
    borderTopColor: colors.light_gray,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  button_row: {
    flexDirection: 'row',
    gap: widthPixel(10),
  },
  button_half: {
    flex: 1,
  },
  modal_overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal_content: {
    backgroundColor: colors.white,
    borderRadius: heightPixel(12),
    padding: heightPixel(20),
    width: '85%',
    maxWidth: widthPixel(350),
  },
  modal_close_button: {
    position: 'absolute',
    top: heightPixel(10),
    right: heightPixel(10),
    width: widthPixel(30),
    height: widthPixel(30),
    borderRadius: widthPixel(15),
    backgroundColor: colors.brown,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  modal_icon_container: {
    alignItems: 'center',
    marginBottom: heightPixel(15),
  },
  modal_icon_circle: {
    width: widthPixel(60),
    height: widthPixel(60),
    borderRadius: widthPixel(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal_title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    textAlign: 'center',
    marginBottom: heightPixel(10),
  },
  modal_message: {
    fontSize: 14,
    color: colors.dark_gray,
    textAlign: 'center',
    marginBottom: heightPixel(20),
    lineHeight: 20,
  },
  policy_text: {
    fontSize: 13,
    color: colors.dark_gray,
    marginBottom: heightPixel(10),
    lineHeight: 18,
  },
  modal_button_row: {
    flexDirection: 'row',
    gap: widthPixel(10),
    marginTop: heightPixel(10),
  },
  modal_button: {
    flex: 1,
  },
  text_input: {
    borderWidth: 1,
    borderColor: colors.light_gray,
    borderRadius: heightPixel(8),
    padding: heightPixel(12),
    fontSize: 14,
    color: colors.black,
    minHeight: heightPixel(100),
    textAlignVertical: 'top',
    marginBottom: heightPixel(15),
  },
});

export default styles;

