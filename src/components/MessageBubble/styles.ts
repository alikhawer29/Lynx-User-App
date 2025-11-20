import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';
import { heightPixel, widthPixel } from '../../utils/helper';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: heightPixel(8),
    paddingHorizontal: widthPixel(16),
  },
  sender_container: {
    justifyContent: 'flex-end',
  },
  receiver_container: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: widthPixel(40),
    height: widthPixel(40),
    borderRadius: widthPixel(20),
    marginHorizontal: widthPixel(8),
  },
  avatar_placeholder: {
    width: widthPixel(40),
    height: widthPixel(40),
    borderRadius: widthPixel(20),
    marginHorizontal: widthPixel(8),
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubble: {
    maxWidth: '70%',
    paddingHorizontal: widthPixel(12),
    paddingVertical: heightPixel(8),
    borderRadius: widthPixel(12),
  },
  sender_bubble: {
    // backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: '#66666633',
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  receiver_bubble: {
    backgroundColor: 'rgba(182, 157, 116, 0.6)',
    borderTopLeftRadius: 0,
  },
  message_text: {
    marginBottom: heightPixel(4),
    color: '#666666',
  },
  time_text: {
    alignSelf: 'flex-end',
    marginTop: heightPixel(4),
    color: '#666666',
  },
  attachments_container: {
    marginTop: heightPixel(8),
  },
  attachment_item: {
    marginBottom: heightPixel(8),
  },
  attachment_image: {
    width: widthPixel(200),
    height: heightPixel(150),
    borderRadius: widthPixel(8),
  },
  attachment_file: {
    backgroundColor: colors.light_primary,
    padding: widthPixel(8),
    borderRadius: widthPixel(8),
    borderWidth: 1,
    borderColor: colors.primary,
  },
});

export default styles;
