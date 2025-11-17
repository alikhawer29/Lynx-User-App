import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';
import { heightPixel, widthPixel } from '../../utils/helper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.white,
  },
  header_section: {
    // backgroundColor: colors.white,
    paddingVertical: heightPixel(20),
    paddingHorizontal: widthPixel(20),
  },
  rating_title_container: {
    alignItems: 'flex-end',
    marginBottom: heightPixel(15),
  },
  rating_title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
  },
  rating_subtitle: {
    fontSize: 17,
    color: colors.dark_gray,
    marginTop: heightPixel(5),
  },
  rating_bars_container: {
    width: '100%',
    marginTop: heightPixel(10),
  },
  rating_bar_row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: heightPixel(10),
  },
  rating_label: {
    width: 60,
    fontSize: 14,
    color: '#666666',
    fontWeight: '400',
  },
  rating_bar_background: {
    flex: 1,
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginHorizontal: widthPixel(10),
    overflow: 'hidden',
  },
  rating_bar_fill: {
    height: '100%',
    backgroundColor: '#FFB400',
    borderRadius: 3,
  },
  rating_count_text: {
    fontSize: 17,
    color: '#333333',
  },
  filter_section: {
    paddingHorizontal: widthPixel(20),
    paddingVertical: heightPixel(20),
    // backgroundColor: colors.white,
  },
  filter_scroll: {
    flexDirection: 'row',
  },
  filter_button: {
    paddingHorizontal: widthPixel(18),
    paddingVertical: heightPixel(10),
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#333333',
    marginRight: widthPixel(10),
    backgroundColor: '#F5F5F5',
  },
  filter_button_active: {
    backgroundColor: '#D4A574',
  },
  filter_button_text: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  filter_button_text_active: {
    color: colors.white,
    fontWeight: '600',
  },
  reviews_list: {
    paddingHorizontal: widthPixel(20),
    paddingTop: heightPixel(20),
    // backgroundColor: colors.white,
  },
  review_card: {
    marginBottom: heightPixel(25),
  },
  review_header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: heightPixel(12),
  },
  user_avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
    marginRight: widthPixel(12),
  },
  review_user_info: {
    flex: 1,
  },
  review_user_name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: heightPixel(4),
  },
  review_date: {
    fontSize: 12,
    color: '#666666',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  review_stars: {
    flexDirection: 'row',
    marginBottom: heightPixel(10),
  },
  star: {
    fontSize: 18,
    marginRight: 3,
  },
  review_text: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 22,
  },
  load_more_button: {
    paddingVertical: heightPixel(15),
    alignItems: 'center',
  },
  load_more_text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  empty_container: {
    paddingVertical: heightPixel(50),
    alignItems: 'center',
  },
  empty_text: {
    fontSize: 16,
    color: colors.dark_gray,
  },
});

export default styles;
