import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';
import { heightPixel } from '../../utils/helper';

const styles = StyleSheet.create({
  scroll_content: {
    // paddingBottom: heightPixel(30),
  },
  price_text: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.black,
  },
  price_type: {
    fontSize: 12,
    color: colors.dark_gray,
  },
  service_image: {
    height: heightPixel(180),
    borderRadius: heightPixel(8),
    marginBottom: heightPixel(15),
  },
  header_row: {
    marginBottom: heightPixel(5),
  },
  price_label: {
    marginBottom: heightPixel(20),
  },
  section: {
    marginBottom: heightPixel(15),
    padding: heightPixel(15),
    backgroundColor: colors.white,
    borderRadius: heightPixel(8),
    borderWidth: 1,
    borderColor: colors.light_gray,
  },
  section_title: {
    marginBottom: heightPixel(15),
  },
  info_box: {
    marginTop: heightPixel(15),
    padding: heightPixel(15),
    backgroundColor: colors.light_primary,
    borderRadius: heightPixel(8),
  },
  contact_grid: {
    marginTop: heightPixel(15),
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: heightPixel(15),
  },
  contact_item: {
    width: '48%',
    gap: heightPixel(5),
  },
  detail_item: {
    marginBottom: heightPixel(20),
  },
  detail_label: {
    marginBottom: heightPixel(10),
    color: '#22282C',
  },
  service_detail_item: {
    flex: 1,
  },
  time_button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: heightPixel(8),
    paddingHorizontal: heightPixel(20),
    paddingVertical: heightPixel(12),
    borderRadius: heightPixel(8),
    borderWidth: 1,
    borderColor: colors.light_gray,
    backgroundColor: colors.white,
  },
  time_button_selected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  date_button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: heightPixel(10),
    paddingHorizontal: heightPixel(15),
    paddingVertical: heightPixel(12),
    borderRadius: heightPixel(8),
    borderWidth: 1,
    borderColor: colors.light_gray,
    backgroundColor: colors.white,
    alignSelf: 'flex-start',
  },
  time_slots_container: {
    flexWrap: 'wrap',
  },
  time_slot: {
    paddingHorizontal: heightPixel(15),
    paddingVertical: heightPixel(12),
    borderRadius: heightPixel(8),
    borderWidth: 1,
    borderColor: colors.light_gray,
    backgroundColor: colors.white,
    marginBottom: heightPixel(10),
  },
  time_slot_selected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  continue_button: {
    marginTop: heightPixel(20),
  },
});

export default styles;
