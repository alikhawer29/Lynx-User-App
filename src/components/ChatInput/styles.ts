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
    paddingHorizontal: widthPixel(0),
    paddingTop: heightPixel(8),
    marginBottom: heightPixel(8),
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  file_item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.light_primary,
    paddingHorizontal: widthPixel(12),
    paddingVertical: heightPixel(8),
    borderRadius: widthPixel(8),
    marginBottom: heightPixel(8),
    marginRight: widthPixel(8),
    width: widthPixel(120),
  },
  file_name: {
    flex: 1,
    marginRight: widthPixel(8),
  },
  file_image: {
    width: widthPixel(50),
    height: widthPixel(50),
    borderRadius: widthPixel(4),
    marginRight: widthPixel(8),
  },
  remove_button: {
    backgroundColor: colors.danger,
    borderRadius: widthPixel(10),
    width: widthPixel(20),
    height: widthPixel(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  input_container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: widthPixel(12),
    paddingVertical: heightPixel(10),
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: widthPixel(8),
    paddingHorizontal: widthPixel(16),
    paddingVertical: heightPixel(10),
    maxHeight: heightPixel(100),
    fontSize: 14,
    color: colors.black,
    textAlignVertical: 'top',
  },
  attachment_button: {
    padding: widthPixel(8),
  },
  camera_button: {
    padding: widthPixel(8),
  },
  send_button: {
    padding: widthPixel(8),
    marginLeft: widthPixel(4),
  },
  send_button_disabled: {
    opacity: 0.5,
  },
});

export default styles;
