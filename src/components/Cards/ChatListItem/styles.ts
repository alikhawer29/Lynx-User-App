import { StyleSheet } from 'react-native';
import colors from '../../../utils/colors';
import { heightPixel, widthPixel } from '../../../utils/helper';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: widthPixel(16),
    borderTopWidth: 1,
    borderTopColor: '#C2C2C2',
    borderBottomWidth: 1,
    borderBottomColor: '#C2C2C2',
    borderWidth: 1,
    borderColor: '#C2C2C2',
    borderRadius: widthPixel(8),
  },
  avatar: {
    width: widthPixel(50),
    height: widthPixel(50),
    borderRadius: widthPixel(25),
    marginRight: widthPixel(12),
  },
  avatar_placeholder: {
    width: widthPixel(50),
    height: widthPixel(50),
    borderRadius: widthPixel(25),
    marginRight: widthPixel(12),
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: heightPixel(4),
  },
  message_row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  message_text: {
    flex: 1,
    marginRight: widthPixel(8),
  },
  unread_badge: {
    backgroundColor: colors.primary,
    borderRadius: widthPixel(12),
    minWidth: widthPixel(24),
    height: widthPixel(24),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: widthPixel(6),
  },
});

export default styles;
