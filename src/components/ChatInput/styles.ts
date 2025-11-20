import { StyleSheet, Platform } from 'react-native';
import colors from '../../utils/colors';
import { heightPixel, widthPixel } from '../../utils/helper';

const styles = StyleSheet.create({
  container: {
    // backgroundColor: colors.white,
    // borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    // paddingBottom: Platform.OS === 'ios' ? heightPixel(20) : heightPixel(10),
  },
  files_preview: {
    paddingHorizontal: widthPixel(16),
    paddingTop: heightPixel(8),
    maxHeight: heightPixel(100),
  },
  file_item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.light_primary,
    paddingHorizontal: widthPixel(12),
    paddingVertical: heightPixel(8),
    borderRadius: widthPixel(8),
    marginBottom: heightPixel(4),
  },
  file_name: {
    flex: 1,
    marginRight: widthPixel(8),
  },
  input_container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: widthPixel(3),
    paddingTop: heightPixel(10),
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: widthPixel(8),
    paddingHorizontal: widthPixel(16),
    paddingVertical: heightPixel(10),
    maxHeight: heightPixel(100),
    fontSize: 14,
    color: colors.black,
    borderColor: '#66666633',
    borderWidth: 1,
  },
  attachment_button: {
    marginLeft: widthPixel(8),
    padding: widthPixel(8),
  },
  camera_button: {
    // marginLeft: widthPixel(4),
    padding: widthPixel(8),
  },
  send_button: {
    // backgroundColor: colors.primary,
    borderRadius: widthPixel(20),
    width: widthPixel(40),
    height: widthPixel(40),
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: widthPixel(2),
  },
  send_button_disabled: {
    opacity: 0.5,
  },
});

export default styles;
