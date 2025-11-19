// styles.js
import { StyleSheet } from 'react-native';
import colors from '../../utils/colors';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  sectionTitle: {
    marginBottom: 16,
    marginTop: 8,
    color: '#22282C',
  },
  aboutText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.dark_gray,
    textAlign: 'left',
  },
});

export default styles;
