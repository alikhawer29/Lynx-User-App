import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';
import { heightPixel } from '../../utils/helper';

const styles = StyleSheet.create({
  scroll_content: {
    // paddingBottom: heightPixel(30),
  },
  price_text: {
    fontSize: 19,
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
    marginBottom: heightPixel(10),
  },
  price_label: {
    marginBottom: heightPixel(20),
  },
  section: {
    marginBottom: heightPixel(15),
    borderBottomWidth: 1,
    borderBottomColor: colors.light_gray,
    backgroundColor: '#FFFFFF',
    borderRadius: heightPixel(8),
    padding: heightPixel(15),
    borderWidth: 1,
    borderColor: colors.light_gray,
  },
  section_title: {
    marginBottom: heightPixel(0),
  },
  view_button: {
    marginTop: heightPixel(15),
    backgroundColor: colors.primary,
  },
  address_preview: {
    marginTop: heightPixel(5),
    marginBottom: heightPixel(15),
  },
  map_preview: {
    height: heightPixel(150),
    borderRadius: heightPixel(8),
    marginBottom: heightPixel(10),
  },
  address_info: {
    marginBottom: heightPixel(15),
  },
  address_text_container: {
    flex: 1,
    marginRight: heightPixel(10),
  },
  continue_button: {
    marginTop: heightPixel(20),
    backgroundColor: '#C4A574',
  },
  detail_item: {
    marginBottom: heightPixel(20),
  },
  detail_label: {
    marginBottom: heightPixel(10),
  },
  time_button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: heightPixel(8),
    paddingVertical: heightPixel(12),
    paddingHorizontal: heightPixel(20),
    borderRadius: heightPixel(8),
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },
  time_button_selected: {
    backgroundColor: colors.primary,
  },
  time_slots_container: {
    marginBottom: heightPixel(10),
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: heightPixel(10),
  },
  time_slot: {
    width: '48%',
    paddingVertical: heightPixel(15),
    paddingHorizontal: heightPixel(10),
    borderRadius: heightPixel(8),
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  time_slot_selected: {
    width: '48%',
    paddingVertical: heightPixel(15),
    paddingHorizontal: heightPixel(10),
    borderRadius: heightPixel(8),
    borderWidth: 0,
    backgroundColor: '#2C3E50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  time_slot_booked: {
    width: '48%',
    paddingVertical: heightPixel(15),
    paddingHorizontal: heightPixel(10),
    borderRadius: heightPixel(8),
    borderWidth: 0,
    backgroundColor: '#FF3B30',
    alignItems: 'center',
    justifyContent: 'center',
  },
  schedules_header: {
    marginBottom: heightPixel(15),
  },
  dates_container: {
    marginBottom: heightPixel(25),
  },
  date_item: {
    flex: 1,
    paddingVertical: heightPixel(10),
    paddingHorizontal: heightPixel(5),
    borderRadius: heightPixel(8),
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: heightPixel(41),
  },
  date_item_selected: {
    borderWidth: 0,
    backgroundColor: '#2C3E50',
  },
  date_item_booked: {
    borderWidth: 0,
    backgroundColor: '#FF3B30',
  },
  available_hours_title: {
    marginBottom: heightPixel(15),
  },
  slots_loading: {
    paddingVertical: heightPixel(20),
    alignItems: 'center',
  },
  no_slots: {
    paddingVertical: heightPixel(30),
    alignItems: 'center',
  },

  collapse_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: heightPixel(10),
  },
  contact_grid: {
    marginTop: heightPixel(15),
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: heightPixel(15),
  },
  contact_item: {
    width: '55%',
    gap: heightPixel(5),
  },
  summary_section: {
    marginTop: heightPixel(15),
    paddingTop: heightPixel(15),
    borderTopWidth: 1,
    borderTopColor: colors.light_gray,
  },
  service_detail_item: {
    flex: 1,
  },
});

export default styles;
