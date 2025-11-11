import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';
import { heightPixel, GLOBAL_HORIZONTAL_PADDING } from '../../utils/helper';

const styles = StyleSheet.create({
  search_container: {
    marginBottom: heightPixel(15),
  },
  title: {
    marginBottom: heightPixel(20),
  },
  map_container: {
    flex: 1,
    borderRadius: heightPixel(12),
    overflow: 'hidden',
    marginBottom: heightPixel(20),
  },
  map_placeholder: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  button_container: {
    marginTop: 'auto',
  },
});

export default styles;
