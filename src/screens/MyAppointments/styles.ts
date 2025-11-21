import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';
import { heightPixel, widthPixel } from '../../utils/helper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: '100%',
  },
  filter_container: {
    paddingVertical: heightPixel(15),
  },
  filter_scroll: {
    // paddingHorizontal: widthPixel(20),
  },
  filter_tab: {
    paddingHorizontal: widthPixel(16),
    paddingVertical: heightPixel(5),
    borderRadius: heightPixel(20),
    marginRight: widthPixel(10),
    // backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.medium_gray,
  },
  filter_tab_active: {
    backgroundColor: '#B69D74',
    borderColor: '#B69D74',
  },
  filter_text: {
    fontSize: 14,
    color: '#B69D74',
  },
  filter_text_active: {
    color: colors.white,
    fontWeight: '600',
  },
  list_container: {
    paddingBottom: heightPixel(20),
  },
  booking_card: {
    borderRadius: heightPixel(12),
    padding: heightPixel(15),
    marginBottom: heightPixel(15),
    borderWidth: 1,
    borderColor: '#C2C2C2',
  },
  label_text: {
    fontSize: 14,
    // color: '#4C4C4C',
    marginBottom: 6,
    fontWeight: '500',
  },
  booking_status_row: {
    flexDirection: 'row',
    marginTop: 6,
    alignItems: 'center',
  },
  sub_status_label: {
    fontSize: 13,
    // color: '#6B6B6B',
  },
  sub_status_value: {
    fontSize: 13,
    fontWeight: '600',
  },

  booking_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: heightPixel(10),
  },
  booking_date: {
    fontSize: 14,
    color: colors.dark_gray,
    fontWeight: '500',
  },
  booking_id: {
    fontSize: 12,
    color: colors.medium_gray,
  },
  service_name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    marginBottom: heightPixel(8),
  },
  price_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: heightPixel(10),
  },
  price_type: {
    fontSize: 14,
    color: colors.dark_gray,
  },
  price_amount: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  status_row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: widthPixel(10),
    marginTop: heightPixel(5),
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
  sub_status_text: {
    fontSize: 12,
    // color: colors.dark_gray,
  },
  load_more_button: {
    marginTop: heightPixel(10),
    marginBottom: heightPixel(20),
  },
  empty_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: heightPixel(60),
  },
  empty_text: {
    fontSize: 16,
    color: colors.dark_gray,
    textAlign: 'center',
  },
  loading_container: {
    paddingVertical: heightPixel(40),
    alignItems: 'center',
  },
});

export default styles;
